import React, { useEffect, useState } from "react";

import MyAppBar from "../../components/UI/AppBar/MyAppBar";
import AppContainer from "../../components/UI/AppContainer";
import GlyphContainer from "../../components/Glyphs/GlyphContainer";
import DisplayGlyph from "../../components/Glyphs/DisplayGlyph";
import FixedButton from "../../components/UI/Buttons/FixedButton";
import LoadingDiv from "../../components/UI/LoadingState/LoadingDiv";

import { Typography } from "@mui/material";
import CustomizedTypography from "../../components/UI/CustomizedTypography"

import { getYeroglyphs } from "../../ethereum/yeroglyphs";
import { getSignerHandler } from "../../ethereum/web3";
import { getImages } from "../../helpers/drawGlyph";
import { ImageStateProps } from "../../helpers/types";
import { useAuthContext } from "../../store/authContext";

interface Props {
    isMintReleased: boolean;
  }

export default function Generate(props: Props) {

    const [images, setImages] = useState<ImageStateProps[]>([]);
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
            let currImages: ImageStateProps[] = [];
            for(let i = 0; i < nbOfNftsOwned; i++) {
                const id = await yeroglyphs.tokenOfOwnerByIndex(signerAddress, i);
                const imageURI = await yeroglyphs.viewCurrentTokenURI(id);

                const tokenURI = await yeroglyphs.tokenURI(id);
                const rawTokenURI = Buffer.from(tokenURI.substring(29), "base64").toString();
                const isGenesis = rawTokenURI.includes("true");
    
                const encodedSVG = getImages(imageURI);
                currImages.push({ svg: encodedSVG, id: id, isGenesis: isGenesis });
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
        await yeroglyphs.saveTokenURI(id, block);
    }

    useEffect(() => {
        getNFTs();
    }, [authContext]);
    
  return (
    <React.Fragment>
        <MyAppBar isLP={false} isMintReleased={props.isMintReleased} />
        <AppContainer>
            {isLoading && <LoadingDiv />}
            {!isLoading && <FixedButton onRefresh={getNFTs} />}
            {(!isLoading || images.length >= 1) && <CustomizedTypography>{`Current State Of My Nfts (as of block #${block})`}</CustomizedTypography>}
            <GlyphContainer>
                {images.length >= 1 && images.map(image => <DisplayGlyph 
                    key={image.id} 
                    src={image.svg} 
                    id={image.id} 
                    isDynamic={true} 
                    isGenesis={image.isGenesis}
                    onSaveNft={saveNFTHandler} 
                />)}
                {!isLoading && images.length === 0 && <Typography component="p" variant="h5" color="primary">{`You don't own any NFT`}</Typography>}
            </GlyphContainer>
        </AppContainer>
    </React.Fragment>
  );
}