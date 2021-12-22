import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { ethers, BigNumber } from "ethers";
import { getYeroglyphs } from "../../../ethereum/yeroglyphs";
import { getMarketplace } from "../../../ethereum/marketplace";
import { getWeth } from "../../../ethereum/weth";
import { getImages } from "../../../helpers/drawGlyph";
import { goldColor } from "../../../helpers/constant";
import { shortenAddress } from "../../../helpers/functions";
import marketplaceABI from "../../../ethereum/abis/marketplaceABI.json";
import ERC721ABI from "../../../ethereum/abis/ERC721ABI.json";


import MyAppBar from "../../../components/UI/AppBar/MyAppBar";
import AppContainer from "../../../components/UI/Cards/AppContainer";
import GoldButton from "../../../components/UI/Buttons/GoldButtonContained";
import CircularIndeterminate from "../../../components/UI/LoadingState/LoadingSpinner";
import OfferTable from "../../../components/Marketplace/OfferTable";
import CustomizedAccordions from "../../../components/UI/CollapseGroupItem";

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { Typography } from "@mui/material";
import SellNftModal from "../../../components/Marketplace/SellNftModal";
import MakeOfferModal from "../../../components/Marketplace/MakeOfferModal";

import { useAuthContext } from "../../../store/authContext";

interface NFTType {
    owner: string;
    image: string;
    isGenesis: boolean;
    quantity: BigNumber;
    payToken: string;
    price: BigNumber;
    startingTime: BigNumber;
    onSale: boolean;
    salePrice: BigNumber;
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
    onSale: false,
    salePrice: BigNumber.from(0)
};

const INITIAL_OFFER_STATE = [{
    creator: "",
    nftAddress: "",
    tokenId: "",
    quantity: "",
    payToken: "",
    price: "",
    deadline: ""
}];

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    backgroundColor: "#0d0d0d",
    border: "1px #1a1a1a solid",
    borderRadius: "1em",
}));

function ItemPage() {

    const [nft, setNft] = React.useState<NFTType>(INITIAL_NFT_STATE);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [offers, setOffers] = React.useState<(Offer | undefined)[]>(INITIAL_OFFER_STATE);
    const [isMakingOffer, setIsMakingOffer] = React.useState<boolean>(false);
    const [isNftOwner, setIsNftOwner] = React.useState<boolean>(false);
    const [isSellingNft, setIsSellingNft] = React.useState<boolean>(false);

    const router = useRouter();
    const { tokenId, nftAddress } = router.query;

    const authContext = useAuthContext();

    React.useEffect(() => {
        if(!router.isReady) return;
        getNFT();
        getOffers();
    }, [router.isReady, authContext.signerAddress]);

    const getNftOwner = function(nftOwner: string) {
        const signerAddress = authContext.signerAddress;

        console.log(signerAddress, signerAddress === nftOwner);
        
        if(signerAddress === nftOwner) {
            setIsNftOwner(true);
            return;
        } 

        setIsNftOwner(false);
    }
    
    async function getNFT() {

        setIsLoading(true);
        const yero = await getYeroglyphs();
        const marketplace = await getMarketplace();

        const owner = await yero.ownerOf(tokenId);

        const defaultIndex = await yero.tokenIdDefaultIndex(tokenId);
        const imageURI = await yero.viewSpecificTokenURI(tokenId, defaultIndex);

        const tokenURI = await yero.tokenURI(tokenId);
        const rawTokenURI = Buffer.from(tokenURI.substring(29), "base64").toString();
        const isGenesis = rawTokenURI.includes("true");
        const decodedSVG = getImages(imageURI);

        const listing = await marketplace.listings(nftAddress, tokenId, owner);

        const listingObject = {
            image: decodedSVG,
            isGenesis: isGenesis,
            owner: owner,
            quantity: listing.quantity,
            payToken: listing.payToken,
            price: listing.pricePerItem,
            startingTime: listing.startingTime,
            onSale: !listing.pricePerItem.isZero(),
            salePrice: listing.pricePerItem
        };

        setNft(listingObject);
        getNftOwner(owner);
        setIsLoading(false);
    }

    async function getOffers() {
        const marketplace = await getMarketplace();

        let eventFilterCreation = marketplace.filters.OfferCreated(null, nftAddress);
        let eventFilterDeletion = marketplace.filters.OfferCanceled(null, nftAddress);
        let eventsCreation = await marketplace.queryFilter(eventFilterCreation);
        let eventsDeletion = await marketplace.queryFilter(eventFilterDeletion);
        const marketplaceInterface =  new ethers.utils.Interface(marketplaceABI);

        const filteredEventsCreation = eventsCreation.map(event => {
            const data = event.data;
            const topics = event.topics;

            const offer = marketplaceInterface.parseLog({ data, topics });

            return offer;
        });

        const filteredEventsDeletion = eventsDeletion.map(event => {
            const data = event.data;
            const topics = event.topics;

            const deletedOffer = marketplaceInterface.parseLog({ data, topics });

            return deletedOffer;
        });

        const allCreatedOffers = filteredEventsCreation.map(event => {
            const {
                creator,
                nft,
                tokenId: _tokenId,
                quantity,
                payToken,
                pricePerItem,
                deadline
            } = event.args;
            if(_tokenId.toString() === tokenId) {
                const dateDeadline = new Intl.DateTimeFormat("en-US").format(deadline * 1000);

                return {
                    creator: creator,
                    nftAddress: nft,
                    tokenId: _tokenId.toString(),
                    quantity: quantity.toString(),
                    payToken: payToken,
                    price: pricePerItem.toString(),
                    deadline: deadline.toString(),
                    dateDeadline: dateDeadline
                };
            }
        });

        filteredEventsDeletion.forEach(deletedEvent => {
            const {
                creator,
                nft,
                tokenId
            } = deletedEvent.args;

            const correspondingOffer = allCreatedOffers.find((object) => {
                if(
                    typeof(object?.creator) === "undefined" ||
                    typeof(object?.nftAddress) === "undefined" ||
                    typeof(object?.tokenId) === "undefined"
                ) return;
                return (object.creator.toString() === creator.toString() && object.nftAddress.toString() === nft.toString() && object.tokenId.toString() === tokenId.toString());
            });
            const correspondingOfferIndex = allCreatedOffers.indexOf(correspondingOffer);

            allCreatedOffers.splice(correspondingOfferIndex, 1);

        });
        
        setOffers(allCreatedOffers);
    }

    const buyNft = async function() {
        const marketplace = await getMarketplace();
        const weth = await getWeth();
        if(typeof(nftAddress) !== "string") return;
        const nftContract = await new ethers.Contract(nftAddress, ERC721ABI, marketplace.signer);

        const owner = await nftContract.ownerOf(tokenId);

        await marketplace.buyItem(nftAddress, tokenId, weth.address, owner);
    } 

    const cancelListing = async function() {
        const marketplace = await getMarketplace();

        if(
            typeof(nftAddress) !== "string" ||
            typeof(tokenId) !== "string" 
        ) return;
        
        try {
            await marketplace.cancelListing(nftAddress, tokenId);
        } catch(error) {
            console.log(error);
        }
    }

    const closeOfferModal = function() {
        setIsMakingOffer(false);
    }
    
    const openOfferModal = function() {
        setIsMakingOffer(true);
    }

    const openSellModal = function() {
        setIsSellingNft(true);
    }

    const closeSellModal = function() {
        setIsSellingNft(false);
    }
    
    return(
        <React.Fragment>
            <MyAppBar isLP={false} />
            <Container maxWidth="lg">
                <Grid container>
                    <Grid container sx={{ marginTop: "5%", backgroundColor: "black", borderRadius: "0.5em" }}>
                        <Grid item sm={12} md={4}>
                            <div style={{ backgroundColor: "white", borderTopLeftRadius: "0.5em", borderBottomLeftRadius: "0.5em" }}>
                                {nft.image && <Image src={nft.image} alt={`yero-${tokenId}`} width="400" height="400" />}
                                {isLoading && <CircularIndeterminate />}
                            </div>
                        </Grid>
                        <Grid item sm={12} md={8} sx={{ padding: "3% 0% 1% 3%", display: "flex", flexDirection: "column" }}>
                            <Typography component="p" variant="h4" color="primary" sx={{ fontWeight: "bold" }}>
                                {nft.isGenesis ? <span style={{ color: goldColor }}>{`Genesis Yero #${tokenId}`}</span> : `Yero #${tokenId}`}
                            </Typography>
                            <Typography component="p" variant="h6" color="primary">
                                {`Owned by ${shortenAddress(nft.owner)}`}
                            </Typography>
                            <Grid item sm={12} sx={{ padding: "3% 3% 0% 0%" }}>
                                <Item>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Typography component="p" variant="h6" color="primary">{`Statut: ${nft.onSale ? `On Sale - ${ethers.utils.formatEther(nft.salePrice)} Ξ` : "Not on Sale"}`}</Typography>
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
                                {(!isNftOwner && nft.onSale) && <GoldButton onClick={buyNft}>Buy</GoldButton>}
                                {(isNftOwner && !nft.onSale) && <GoldButton onClick={openSellModal}>Sell</GoldButton>}
                                {!isNftOwner && <GoldButton onClick={openOfferModal}>Make Offer</GoldButton>}
                                {(isNftOwner && nft.onSale) && <GoldButton onClick={cancelListing}>Cancel Listing</GoldButton>}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ marginTop: "5%", backgroundColor: "black", borderTopLeftRadius: "0.5em", borderTopRightRadius: "0.5em" }}>
                        <CustomizedAccordions main={<span>Offers</span>} details={[<Grid key="grid-1" item xs={12}>{typeof(offers[0]) !== "undefined" && (<OfferTable titles={["Price", "Expiration", "From"]} rows={offers} />)}</Grid>]} />
                    </Grid>
                </Grid>
            </Container>
            {isSellingNft && <SellNftModal onCloseModal={closeSellModal} nftAddress={nftAddress} />}
            {isMakingOffer && <MakeOfferModal onCloseModal={closeOfferModal} message="You want to buy right?" />}
        </React.Fragment>
    );
}

export default ItemPage;