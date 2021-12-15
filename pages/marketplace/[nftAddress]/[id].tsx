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
import BasicTable from "../../../components/UI/BasicTable";

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { Typography } from "@mui/material";

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
    const [orderPrice, setPrice] = React.useState<string>("");
    const [deadline, setDeadline] = React.useState<string>("");

    const router = useRouter();
    const { id, nftAddress } = router.query;

    React.useEffect(() => {
        if(!router.isReady) return;
        getNFT();
        setOffers();
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

    async function setOffers() {
        const marketplace = await getMarketplace();

        const signerAddress = await marketplace.signer.getAddress();
        
        const offers = await marketplace.offers(nftAddress, id, signerAddress);

    }

    async function makeOffer() {
        const marketplace = await getMarketplace();
        const weth = await getWeth();

        console.log(orderPrice);
        console.log(deadline);
        const quantity = 1;
        const price = ethers.utils.parseEther(orderPrice);

        await marketplace.createOffer(nftAddress, id, weth.address, quantity, price, deadline);
    }

    async function setPriceHandler(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        let enteredNumber = event.currentTarget.value;
  
        setPrice(enteredNumber);
    }

    async function setDeadlineHandler(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        let enteredNumber = event.currentTarget.value;
        if(isNaN(+enteredNumber)) return;
        if(+enteredNumber === 0 || enteredNumber === "") {
            setDeadline("");
            return;
        };
  
        setDeadline(enteredNumber);
    }

    async function getOffers() {
        const marketplace = await getMarketplace();
        const offers = await marketplace.filters.OfferCreated(null, nftAddress);
        console.log("nft address", nftAddress);

        const iface =  new ethers.utils.Interface(marketplaceABI);
        
        // console.log(offers);
        // const test = iface.parseLog(offers);
        // console.log(test);
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
                                <input onChange={setPriceHandler} value={orderPrice} />
                                <input onChange={setDeadlineHandler} />
                                <GoldButton onClick={makeOffer}>Make Offer</GoldButton>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ marginTop: "5%", backgroundColor: "black" }}>
                        <Grid item sx={{ border: "1px white solid", borderRadius: "0.5em" }}>
                            <Typography component="p" variant="h6" color="primary">Offers</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
}

export default ItemPage;