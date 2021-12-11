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

interface ImageState {
    id: string;
    svg: string;
    isGenesis: boolean;
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

            if(!signer) return;
            if(!authContext.isNetworkRight) return;
            const signerAddress = authContext.signerAddress;

            let nbOfNftsOwned;
            try {
                nbOfNftsOwned = await yeroglyphs.balanceOf(signerAddress);
                let currImages: ImageState[] = [];
                for(let i = 0; i < nbOfNftsOwned; i++) {
                    const id = await yeroglyphs.tokenOfOwnerByIndex(signerAddress, i);
                    const defaultIndex = await yeroglyphs.tokenIdDefaultIndex(id);
                    const imageURI = await yeroglyphs.viewSpecificTokenURI(id, defaultIndex);
                    const tokenURI = await yeroglyphs.tokenURI(id);
                    const rawTokenURI = Buffer.from(tokenURI.substring(29), "base64").toString();
                    const isGenesis = rawTokenURI.includes("true") ? true: false;
                    const encodedSVG = getImages(imageURI);
                    currImages.push({ svg: encodedSVG, id: id, isGenesis: isGenesis });
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
                {images.length >= 1 && images.map(image => {
                    return <DisplayGlyph key={image.id} src={image.svg} id={image.id} isGenesis={image.isGenesis} isDynamic={false} />
                })}
            </GlyphContainer>
        </AppContainer>
    </React.Fragment>
  );
}