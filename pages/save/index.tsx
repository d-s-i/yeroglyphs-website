import React from "react";
import { useAuthContext } from "../../store/authContext";

import MyAppBar from "../../components/UI/AppBar/MyAppBar";
import AppContainer from "../../components/UI/Cards/AppContainer";
import DisplayGlyph from "../../components/Glyphs/DisplayGlyph";
import GlyphContainer from "../../components/Glyphs/GlyphContainer";

import { FullImageState } from "../../helpers/types";
import { getFullNftState } from "../../helpers/functions";
import LoadingDiv from "../../components/UI/LoadingState/LoadingDiv";
import TitleTypography from "../../components/UI/Text/TitleTypography";
import Typography from "@mui/material/Typography";

export default function Save() {

    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [images, setImages] = React.useState<FullImageState[]>([]);

    const authContext = useAuthContext();

    React.useEffect(() => {

        getFullNftState(
            setIsLoading,
            authContext,
            setImages
        );

    }, [authContext]);
    
  return (
    <React.Fragment>
        <MyAppBar isLP={false} />
        <AppContainer>
            <TitleTypography>My Yeroglyphs</TitleTypography>
            {isLoading && <LoadingDiv />}
            {images.length >= 1 ? images.map(image => {
                return(
                    <GlyphContainer key={image.tokenId} containMany={true} >
                        {image.svgs.map(svg => {
                            return(
                                <DisplayGlyph
                                    key={svg} 
                                    id={image.tokenId} 
                                    src={svg} 
                                    isGenesis={image.isGenesis}
                                    isDynamic={false}
                                    canBeSaved={true}
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