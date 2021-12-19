import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../store/authContext";

import MyAppBar from "../../components/UI/AppBar/MyAppBar";
import AppContainer from "../../components/UI/AppContainer";
import DisplayManyGlyphs from "../../components/Glyphs/DisplayManyGlyphs";
import GlyphContainer from "../../components/Glyphs/GlyphContainer";

import { getYeroglyphs } from "../../ethereum/yeroglyphs";
import { getImages } from "../../helpers/drawGlyph";
import LoadingDiv from "../../components/UI/LoadingState/LoadingDiv";
import CustomizedTypography from "../../components/UI/CustomizedTypography";
import Typography from "@mui/material/Typography";


interface ImageState {
    tokenId: string;
    isGenesis: boolean;
    defaultIndex: string;
    svgs: string[];
}

interface Props {
    isMintReleased: boolean;
  }

export default function Save(props: Props) {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [images, setImages] = useState<ImageState[]>([]);

    const authContext = useAuthContext();

    useEffect(() => {
        async function getNFTs() {
            setIsLoading(true);
            const yeroglyphs = await getYeroglyphs();
            const signer = yeroglyphs.signer;

            if(!signer) return;
            if(!authContext.isNetworkRight) return;
            const signerAddress = await signer.getAddress();

            let nbOfNftsOwned;
            try {
                nbOfNftsOwned = await yeroglyphs.balanceOf(signerAddress);
                let allBlockNumberSavedPerId = [];
                let nftsState = [];
                for(let i = 0; i < nbOfNftsOwned; i++) {
                    const tokenId = await yeroglyphs.tokenOfOwnerByIndex(signerAddress, i);
                    const defaultIndex = await yeroglyphs.tokenIdDefaultIndex(tokenId);
                    const blockNumberSaved = await yeroglyphs.totalBlockNumberSaved(tokenId);
                    allBlockNumberSavedPerId.push(blockNumberSaved);
                    nftsState.push({tokenId: tokenId, defaultIndex: defaultIndex});
                }
    
    
                let currImages: ImageState[] = [];
                for(let i = 0; i < allBlockNumberSavedPerId.length; i++) {
                    const length = allBlockNumberSavedPerId[i];
                    const tokenId = nftsState[i].tokenId;
                    const defaultIndex = nftsState[i].defaultIndex;
    
                    let intermediateTokenURIs: string[] = [];
                    let isGenesis: boolean;
                    for(let j = 0; j < length; j++) {
                        const imageURI = await yeroglyphs.viewSpecificTokenURI(tokenId, j);
                        intermediateTokenURIs.push(imageURI);
                    }
    
                    let intermediateSVG: string[] = [];
                    for(const k of intermediateTokenURIs) {
                        const encodedSVG = getImages(k);
                        intermediateSVG.push(encodedSVG);
                    }

                    const tokenURI = await yeroglyphs.tokenURI(tokenId);
                    const rawTokenURI = Buffer.from(tokenURI.substring(29), "base64").toString();
                    isGenesis = rawTokenURI.includes("true");
                    
                    currImages.push({ svgs: intermediateSVG, tokenId: tokenId, isGenesis: isGenesis, defaultIndex: defaultIndex });
                    setImages([...currImages]);
                    intermediateTokenURIs = [];
                    intermediateSVG = [];
                }
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        }

        getNFTs();

    }, [authContext]);
    


    
  return (
    <React.Fragment>
        <MyAppBar isLP={false} isMintReleased={props.isMintReleased} />
        <AppContainer>
            <CustomizedTypography>My Yeroglyphs</CustomizedTypography>
            {isLoading && <LoadingDiv />}
            {images.length >= 1 ? images.map(image => {
                return(
                    <GlyphContainer key={image.tokenId} containMany={true} >
                        {image.svgs.map(svg => {
                            console.log(image)
                            return(
                                <DisplayManyGlyphs 
                                    key={svg} 
                                    id={image.tokenId} 
                                    src={svg} 
                                    isGenesis={image.isGenesis}
                                    index={image.svgs.indexOf(svg) === +image.defaultIndex ? undefined : image.svgs.indexOf(svg).toString()} 
                                />
                            );
                        })}
                    </GlyphContainer>
                );
            }) : <Typography component="p" variant="h6" color="primary" align="center">You don&apos;t own any Yero</Typography>}
        </AppContainer>
    </React.Fragment>
  );
}