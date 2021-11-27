import React, { useEffect, useState } from "react";
import MyAppBar from "../../components/UI/MyAppBar";
import AppContainer from "../../components/UI/AppContainer";
import DisplayGlyph from "../../components/Glyphs/DisplayGlyph";
import GlyphContainer from "../../components/Glyphs/GlyphContainer";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { getYeroglyphs } from "../../ethereum/yeroglyphs";
import { getSignerHandler } from "../../ethereum/web3";
import { getImages } from "../../helpers/drawGlyph";
import { useAuthContext } from "../../store/authContext";


const CustomizedTypography = styled(Typography)`
  margin-top: 3%;
  margin-bottom: 3%;
  font-weight: bold;
`;

interface ImageState {
    id: string;
    svg: string;
}

export default function NFTs() {

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
                    const tokenURI = await yeroglyphs.tokenURI(id);
                    const encodedSVG = getImages(tokenURI);
                    currImages.push({svg: encodedSVG, id: id});
                    setImages([...currImages]);
                }
            } catch (error) {
                console.log(error);
            }

            setIsLoading(false);
        }

        getNFTs();

    }, []);
    


    
  return (
    <React.Fragment>
        <MyAppBar />
        <AppContainer>
            <CustomizedTypography variant="h4">My Yeroglyphs</CustomizedTypography>
            {isLoading && <Typography component="h1">Loading...</Typography>}
            <GlyphContainer>
                {images.length >= 1 && images.map(image => <DisplayGlyph key={image.id} src={image.svg} id={image.id} isDynamic={false} />)}
            </GlyphContainer>
        </AppContainer>
    </React.Fragment>
  );
}