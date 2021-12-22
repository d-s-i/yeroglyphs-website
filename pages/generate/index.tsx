import React from "react";

import MyAppBar from "../../components/UI/AppBar/MyAppBar";
import AppContainer from "../../components/UI/Cards/AppContainer";
import GlyphContainer from "../../components/Glyphs/GlyphContainer";
import DisplayGlyph from "../../components/Glyphs/DisplayGlyph";
import FixedButton from "../../components/UI/Buttons/FixedButton";
import LoadingDiv from "../../components/UI/LoadingState/LoadingDiv";

import { Typography } from "@mui/material";
import TitleTypography from "../../components/UI/Text/TitleTypography"

import { getYeroglyphs } from "../../ethereum/yeroglyphs";
import { ImageStateProps } from "../../helpers/types";
import { setCurrentNftsState } from "../../helpers/functions";
import { useAuthContext } from "../../store/authContext";

export default function Generate() {

    const [nftState, setNftState] = React.useState<ImageStateProps[]>([]);
    const [block, setBlock] = React.useState<number>(0);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    const authContext = useAuthContext();

    async function saveNFTHandler(id: string) {
        const yeroglyphs = await getYeroglyphs();
        const signer = yeroglyphs.signer;
        if(!signer) return;
        await yeroglyphs.saveTokenURI(id, block);
    }

    const updateBlock = async function() {
        setIsLoading(true);
        const provider = authContext.provider;
        const currBlock = await provider?.getBlock("latest");
        setBlock(currBlock?.number || 0);
        setIsLoading(false);
    }
    
    React.useEffect(() => {

        setCurrentNftsState(
            { setLoadingFn: setIsLoading, setNftStateFn: setNftState },
            authContext
        );

    }, [authContext, block]);

    React.useEffect(() => {
        updateBlock();
    }, []);
    
  return (
    <React.Fragment>
        <MyAppBar isLP={false} />
        <AppContainer>
            {isLoading && <LoadingDiv />}
            {!isLoading && <FixedButton onRefresh={updateBlock} />}
            {(!isLoading || nftState.length >= 1) && <TitleTypography>{`Current State Of My Nfts (as of block #${block})`}</TitleTypography>}
            <GlyphContainer>
                {nftState.length >= 1 && nftState.map(nft => <DisplayGlyph 
                    key={nft.id} 
                    src={nft.svg} 
                    id={nft.id} 
                    isDynamic={true} 
                    isGenesis={nft.isGenesis}
                    canBeSaved={true}
                    onSaveNft={saveNFTHandler} 
                />)}
                {!isLoading && nftState.length === 0 && <Typography component="p" variant="h5" color="primary">{`You don't own any NFT`}</Typography>}
            </GlyphContainer>
        </AppContainer>
    </React.Fragment>
  );
}