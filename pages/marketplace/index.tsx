import React, { useEffect, useState } from "react";
import MyAppBar from "../../components/UI/AppBar/MyAppBar";
import AppContainer from "../../components/UI/Cards/AppContainer";
import LoadingDiv from "../../components/UI/LoadingState/LoadingDiv";
import MarketplaceGlyph from "../../components/Glyphs/MarketplaceGlyph";
import GlyphContainer from "../../components/Glyphs/GlyphContainer";

import { useAuthContext } from "../../store/authContext";
import { setStaticNftsState } from "../../helpers/functions";
import { ImageStateProps } from "../../helpers/types";

function Marketplace() {

    const authContext = useAuthContext();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [nftState, setNftState] = useState<ImageStateProps[]>([]);

    React.useEffect(() => {
        
        setStaticNftsState(
            { setLoadingFn: setIsLoading, setNftStateFn: setNftState },
            authContext,
        );

    }, [authContext]);
    
    return(
        <React.Fragment>
            <MyAppBar isLP={false} />
            <AppContainer>
                {isLoading && <LoadingDiv />}
                <GlyphContainer>
                    {nftState.length >= 1 && nftState.map(nft => {
                        return (<MarketplaceGlyph 
                            key={nft.id} 
                            src={nft.svg} 
                            id={nft.id} 
                            isGenesis={nft.isGenesis} 
                            isDynamic={false} 
                        />);
                    })}
                </GlyphContainer>
            </AppContainer>
        </React.Fragment>
    );
}

export default Marketplace;