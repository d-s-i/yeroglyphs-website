import React, { useEffect, useState } from "react";

import MyAppBar from "../../components/UI/MyAppBar";
import AppContainer from "../../components/UI/AppContainer";
import GlyphContainer from "../../components/Glyphs/GlyphContainer";
import DisplayGlyph from "../../components/Glyphs/DisplayGlyph";
import FixedButton from "../../components/UI/Buttons/FixedButton";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { getYeroglyphs } from "../../ethereum/yeroglyphs";
import { getSignerHandler } from "../../ethereum/web3";
import { getImages } from "../../helpers/drawGlyph";
import { useAuthContext } from "../../store/authContext";

interface ImageState {
    id: string;
    svg: string;
}

const CustomizedTypography = styled(Typography)`
  margin-top: 3%;
  margin-bottom: 3%;
  font-weight: bold;
`;

export default function NFTs() {

    const [images, setImages] = useState<ImageState[]>([]);
    const [block, setBlock] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const authContext = useAuthContext();

    async function getNFTs() {
        setIsLoading(true);
        const [signer] = await getSignerHandler();
        const yeroglyphs = await getYeroglyphs();
        if(!signer) return;
        if(!authContext.isNetworkRight) return;

        const signerAddress = await signer.getAddress();

        const currBlock = await signer.provider.getBlock("latest");
        setBlock(currBlock.number);

        let nbOfNftsOwned;
        try {
            nbOfNftsOwned = await yeroglyphs.balanceOf(signerAddress);
            let currImages: ImageState[] = [];
            for(let i = 0; i < nbOfNftsOwned; i++) {
                const id = await yeroglyphs.tokenOfOwnerByIndex(signerAddress, i);
                const tokenURI = await yeroglyphs.viewCurrentTokenURI(id);
    
                const encodedSVG = getImages(tokenURI);
                currImages.push({svg: encodedSVG, id: id});
                setImages([...currImages]);
            }
        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);
    }

    async function saveNFTHandler(id: string) {
        const yeroglyphs = await getYeroglyphs();
        const signer = yeroglyphs.signer;
        if(!signer) return;
        const save_tx = await yeroglyphs.saveTokenURI(id);
    }

    useEffect(() => {
        getNFTs();
    }, [authContext]);
    


    
  return (
    <React.Fragment>
        <MyAppBar />
        <AppContainer>
            {isLoading && <Typography component="h6" variant="h6">Loading...</Typography>}
            {!isLoading && <FixedButton onRefresh={getNFTs} />}
            {!isLoading && <CustomizedTypography variant="h3">{`Current State Of My Nfts (as of block #${block})`}</CustomizedTypography>}
            <GlyphContainer>
                {images.length >= 1 && images.map(image => <DisplayGlyph 
                    key={image.id} 
                    src={image.svg} 
                    id={image.id} 
                    isDynamic={true} 
                    onSaveNft={saveNFTHandler} 
                />)}
                {!isLoading && images.length === 0 && <Typography component="p" variant="subtitle1">You don't own any NFT</Typography>}
            </GlyphContainer>
        </AppContainer>
    </React.Fragment>
  );
}