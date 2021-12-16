import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { ethers, BigNumber } from "ethers";
import { PageProps } from "../../../helpers/types";
import { getYeroglyphs } from "../../../ethereum/yeroglyphs";
import { getMarketplace } from "../../../ethereum/marketplace";
import { getWeth } from "../../../ethereum/weth";
import { getImages } from "../../../helpers/drawGlyph";
import { goldColor } from "../../../helpers/constant";
import { shortenAddress } from "../../../helpers/functions";
import marketplaceABI from "../../../ethereum/abis/marketplaceABI.json";

import MyAppBar from "../../../components/UI/AppBar/MyAppBar";
import AppContainer from "../../../components/UI/AppContainer";
import GoldButton from "../../../components/UI/Buttons/GoldButton";
import CircularIndeterminate from "../../../components/UI/LoadingState/LoadingSpinner";
import BasicTable from "../../../components/UI/OfferTable";
import CustomizedAccordions from "../../../components/UI/CollapseGroupItem";

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { Typography } from "@mui/material";
import MakeOfferModal from "../../../components/Marketplace/MakeOfferModal";

interface NFTType {
    owner: string;
    image: string;
    isGenesis: boolean;
    quantity: BigNumber;
    payToken: string;
    price: BigNumber;
    startingTime: BigNumber;
    onSale: boolean;
}

interface Offer {
    creator: string;
    nftAddress: string;
    tokenId: string;
    price: string;
    deadline: string;
    quantity: string;
    payToken: string;
}

const INITIAL_NFT_STATE = {
    image: "", 
    isGenesis: false, 
    owner: "0x0000000000000000000000000000000000000000",
    quantity: BigNumber.from(0),
    payToken: "0x0000000000000000000000000000000000000000",
    price: BigNumber.from(0),
    startingTime: BigNumber.from(0),
    onSale: false
};

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    backgroundColor: "#0d0d0d",
    border: "1px #1a1a1a solid",
    borderRadius: "1em",
}));

function ItemPage(pageProps: PageProps) {

    const [nft, setNft] = React.useState<NFTType>(INITIAL_NFT_STATE);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [offers, setOffers] = React.useState<(Offer | undefined)[]>([]);
    const [isMakingOffer, setIsMakingOffer] = React.useState<boolean>(false);

    const router = useRouter();
    const { id, nftAddress } = router.query;

    React.useEffect(() => {
        if(!router.isReady) return;
        getNFT();
        getOffers();
    }, [router.isReady]);
    
    async function getNFT() {

        setIsLoading(true);
        const yero = await getYeroglyphs();
        const marketplace = await getMarketplace();

        const owner = await yero.ownerOf(id);

        const defaultIndex = await yero.tokenIdDefaultIndex(id);
        const imageURI = await yero.viewSpecificTokenURI(id, defaultIndex);

        const tokenURI = await yero.tokenURI(id);
        const rawTokenURI = Buffer.from(tokenURI.substring(29), "base64").toString();
        const isGenesis = rawTokenURI.includes("true");
        const decodedSVG = getImages(imageURI);

        const listing = await marketplace.listings(nftAddress, id, owner);

        const listingObject = {
            image: decodedSVG,
            isGenesis: isGenesis,
            owner: owner,
            quantity: listing.quantity,
            payToken: listing.payToken,
            price: listing.pricePerItem,
            startingTime: listing.startingTime,
            onSale: !listing.pricePerItem.isZero()
        };

        setNft(listingObject);
        setIsLoading(false);
    }





    async function getOffers() {
        const marketplace = await getMarketplace();

        let eventFilter = marketplace.filters.OfferCreated(null, nftAddress);
        let events = await marketplace.queryFilter(eventFilter);
        const marketplaceInterface =  new ethers.utils.Interface(marketplaceABI);

        const filteredEvents = events.map(event => {
            const data = event.data;
            const topics = event.topics;

            const offer = marketplaceInterface.parseLog({ data, topics });

            return offer;
        });

        const allOffers = filteredEvents.map(event => {
            const {
                creator,
                nft,
                tokenId,
                quantity,
                payToken,
                pricePerItem,
                deadline
            } = event.args;
            if(tokenId.toString() === id) {

                const dateDeadline = new Intl.DateTimeFormat("en-US").format(deadline * 1000);
                console.log(dateDeadline);
                
                return {
                    creator: creator,
                    nftAddress: nft,
                    tokenId: tokenId.toString(),
                    quantity: quantity.toString(),
                    payToken: payToken,
                    price: pricePerItem.toString(),
                    deadline: deadline.toString(),
                    dateDeadline: dateDeadline
                };
            }
        });
        setOffers(allOffers);
    }

    function closeOfferModal() {
        setIsMakingOffer(false);
    }
    
    function openOfferModal() {
        setIsMakingOffer(true);
    }
    
    return(
        <React.Fragment>
            <MyAppBar isLP={false} isMintReleased={pageProps.isMintReleased} />
            <Container maxWidth="lg">
                <Grid container>
                    <Grid container sx={{ marginTop: "5%", backgroundColor: "black", borderRadius: "0.5em" }}>
                        <Grid item sm={12} md={4}>
                            <div style={{ backgroundColor: "white", borderTopLeftRadius: "0.5em", borderBottomLeftRadius: "0.5em" }}>
                                {nft.image && <Image src={nft.image} alt={`yero-${id}`} width="400" height="400" />}
                                {isLoading && <CircularIndeterminate />}
                            </div>
                        </Grid>
                        <Grid item sm={12} md={8} sx={{ padding: "3% 0% 1% 3%", display: "flex", flexDirection: "column" }}>
                            <Typography component="p" variant="h4" color="primary" sx={{ fontWeight: "bold" }}>
                                {nft.isGenesis ? <span style={{ color: goldColor }}>{`Genesis Yero #${id}`}</span> : `Yero #${id}`}
                            </Typography>
                            <Typography component="p" variant="h6" color="primary">
                                {`Owned by ${shortenAddress(nft.owner)}`}
                            </Typography>
                            <Grid item sm={12} sx={{ padding: "3% 3% 0% 0%" }}>
                                <Item>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Typography component="p" variant="h6" color="primary">{`Statut: ${nft.onSale ? "On Sale" : "Not on Sale"}`}</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography component="p" variant="h6" color="primary">{`Rarity: ${nft.isGenesis ? "Genesis" : "Common"}`}</Typography>
                                        </Grid>
                                    </Grid>
                                </Item>
                            </Grid>
                            <Grid item sm={12} sx={{ 
                                    display: "flex", 
                                    justifyContent: "flex-end", 
                                    paddingRight: "5%", 
                                    alignItems: "center", 
                                }}
                            >
                                <GoldButton onClick={openOfferModal}>Make Offer</GoldButton>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ marginTop: "5%", backgroundColor: "black", borderTopLeftRadius: "0.5em", borderTopRightRadius: "0.5em" }}>
                        <CustomizedAccordions main={<span>Offers</span>} details={[<Grid item xs={12}>{typeof(offers[0]) !== "undefined" && (<BasicTable titles={["Price", "Expiration", "From"]} rows={offers}/>)}</Grid>]} />
                    </Grid>
                </Grid>
            </Container>
            {isMakingOffer && <MakeOfferModal onCloseModal={closeOfferModal} message="You want to buy right?" />}
        </React.Fragment>
    );
}

export default ItemPage;