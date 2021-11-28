import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../store/authContext";

import MyAppBar from "../../components/UI/MyAppBar";
import AppContainer from "../../components/UI/AppContainer";
import DisplayManyGlyphs from "../../components/Glyphs/DisplayManyGlyphs";
import GlyphContainer from "../../components/Glyphs/GlyphContainer";

import { getYeroglyphs } from "../../ethereum/yeroglyphs";
import { getImages } from "../../helpers/drawGlyph";
import LoadingDiv from "../../components/UI/LoadingState/LoadingDiv";
import CustomizedTypography from "../../components/UI/CustomizedTypography";

interface ImageState {
    tokenId: string;
    defaultIndex: string;
    svgs: string[];
}

export default function NFTs() {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [images, setImages] = useState<ImageState[]>([]);

    const authContext = useAuthContext();

    useEffect(() => {
        async function getNFTs() {
            console.log("running")
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
                    for(let j = 0; j < length; j++) {
                        const tokenURI = await yeroglyphs.viewSpecificTokenURI(tokenId, j);
                        intermediateTokenURIs.push(tokenURI);
                    }
    
                    let intermediateSVG: string[] = [];
                    for(const k of intermediateTokenURIs) {
                        const encodedSVG = getImages(k);
                        intermediateSVG.push(encodedSVG);
                    }
                    currImages.push({ svgs: intermediateSVG, tokenId: tokenId, defaultIndex: defaultIndex });
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
        <MyAppBar />
        <AppContainer>
            <CustomizedTypography>My Yeroglyphs</CustomizedTypography>
            {isLoading && <LoadingDiv />}
            {images.map(image => {
                return(
                    <GlyphContainer key={image.tokenId} containMany={true} >
                        {image.svgs.map(svg => {
                            return(
                                <DisplayManyGlyphs 
                                    key={svg} 
                                    id={image.tokenId} 
                                    src={svg} 
                                    index={image.svgs.indexOf(svg) === +image.defaultIndex ? undefined : image.svgs.indexOf(svg).toString()} 
                                />
                            );
                        })}
                    </GlyphContainer>
                );
            })}
        </AppContainer>
    </React.Fragment>
  );
}