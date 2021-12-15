import React, { useEffect, useState } from "react";
import MyAppBar from "../../components/UI/AppBar/MyAppBar";
import AppContainer from "../../components/UI/AppContainer";
import CustomizedTypography from "../../components/UI/CustomizedTypography";
import LoadingDiv from "../../components/UI/LoadingState/LoadingDiv";
import MarketplaceGlyph from "../../components/Glyphs/MarketplaceGlyph";
import GlyphContainer from "../../components/Glyphs/GlyphContainer";

import { getMarketplace } from "../../ethereum/marketplace";
import { getYeroglyphs } from "../../ethereum/yeroglyphs";
import { useAuthContext } from "../../store/authContext";
import { ImageStateProps, PageProps } from "../../helpers/types";
import { getImages } from "../../helpers/drawGlyph";

function Marketplace(pageProps: PageProps) {

    const authContext = useAuthContext();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [images, setImages] = useState<ImageStateProps[]>([]);

    useEffect(() => {
        async function getNFTs() {
            setIsLoading(true);
            const yeroglyphs = await getYeroglyphs();
            const signer = yeroglyphs.signer;

            console.log("Running the getNFTs function");
            
            if(!signer) return;
            if(!authContext.isNetworkRight) return;
            const signerAddress = authContext.signerAddress;
            
            let nbOfNftsOwned;
            try {
                nbOfNftsOwned = await yeroglyphs.balanceOf(signerAddress);
                let currImages: ImageStateProps[] = [];
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
    
    return(
        <React.Fragment>
            <MyAppBar isLP={false} isMintReleased={pageProps.isMintReleased} />
            <AppContainer>
                {isLoading && <LoadingDiv />}
                <GlyphContainer>
                    {images.length >= 1 && images.map(image => {
                        return (<MarketplaceGlyph 
                            key={image.id} 
                            src={image.svg} 
                            id={image.id} 
                            isGenesis={image.isGenesis} 
                            isDynamic={false} 
                        />);
                    })}
                </GlyphContainer>
            </AppContainer>
        </React.Fragment>
    );
}

export default Marketplace;