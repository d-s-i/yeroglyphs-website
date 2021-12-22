import React, { useEffect, useState } from "react";
import MyAppBar from "../../components/UI/AppBar/MyAppBar";
import AppContainer from "../../components/UI/Cards/AppContainer";
import DisplayGlyph from "../../components/Glyphs/DisplayGlyph";
import GlyphContainer from "../../components/Glyphs/GlyphContainer";
import LoadingDiv from "../../components/UI/LoadingState/LoadingDiv";

import TitleTypography from "../../components/UI/Text/TitleTypography";

import { useAuthContext } from "../../store/authContext";
import { ImageStateProps } from "../../helpers/types";
import { setNftsState } from "../../helpers/functions";
import Typography from "@mui/material/Typography";

export default function View() {

    const [nftState, setNftState] = useState<ImageStateProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const authContext = useAuthContext();

    useEffect(() => {

        setNftsState(
            setIsLoading,
            setNftState,
            authContext,
            false
        );

    }, [authContext]);
    
  return (
    <React.Fragment>
        <MyAppBar isLP={false} />
        <AppContainer>
            <TitleTypography>My Yeroglyphs</TitleTypography>
            {isLoading && <LoadingDiv />}
            <GlyphContainer>
                {nftState.length ? nftState.map(image => {
                    return <DisplayGlyph key={image.id} src={image.svg} id={image.id} isGenesis={image.isGenesis} isDynamic={false} canBeSaved={false} />
                }) : <Typography component="p" variant="h6" color="primary">You don&apos;t own any Yero</Typography>}
            </GlyphContainer>
        </AppContainer>
    </React.Fragment>
  );
}