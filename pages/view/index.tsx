import React, { useEffect, useState } from "react";
import MyAppBar from "../../components/UI/AppBar/MyAppBar";
import AppContainer from "../../components/UI/AppContainer";
import DisplayGlyph from "../../components/Glyphs/DisplayGlyph";
import GlyphContainer from "../../components/Glyphs/GlyphContainer";
import LoadingDiv from "../../components/UI/LoadingState/LoadingDiv";

import CustomizedTypography from "../../components/UI/CustomizedTypography";

import { getYeroglyphs } from "../../ethereum/yeroglyphs";
import { getImages } from "../../helpers/drawGlyph";
import { useAuthContext } from "../../store/authContext";
import network from "../../ethereum/network";

interface ImageState {
    id: string;
    svg: string;
}

interface Props {
    isMintReleased: boolean;
  }

export default function View(props: Props) {

    const [images, setImages] = useState<ImageState[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const authContext = useAuthContext();

    useEffect(() => {
        async function getNFTs() {
            setIsLoading(true);
            const yeroglyphs = await getYeroglyphs();
            const signer = yeroglyphs.signer;

            if(!signer) {
                // throw new Error(`Please connect to the ${network.name} network`)
            } 
            if(!authContext.isNetworkRight) {
                // throw new Error(`Please connect to the ${network.name} network`)
            } 
            const signerAddress = authContext.signerAddress;

            let nbOfNftsOwned;
            try {
                nbOfNftsOwned = await yeroglyphs.balanceOf(signerAddress);
                let currImages: ImageState[] = [];
                for(let i = 0; i < nbOfNftsOwned; i++) {
                    const id = await yeroglyphs.tokenOfOwnerByIndex(signerAddress, i);
                    const defaultIndex = await yeroglyphs.tokenIdDefaultIndex(id);
                    const imageURI = await yeroglyphs.viewSpecificTokenURI(id, defaultIndex);
                    // const tokenURI = await yeroglyphs.tokenURI(id);
                    const encodedSVG = getImages(imageURI);
                    currImages.push({svg: encodedSVG, id: id});
                    setImages([...currImages]);
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
            <GlyphContainer>
                {images.length >= 1 && images.map(image => <DisplayGlyph key={image.id} src={image.svg} id={image.id} isDynamic={false} />)}
            </GlyphContainer>
        </AppContainer>
    </React.Fragment>
  );
}