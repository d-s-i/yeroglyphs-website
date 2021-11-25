import React, { useEffect, useState } from "react";
import MyAppBar from "../../components/UI/MyAppBar";
import AppContainer from "../../components/UI/AppContainer";

import { getYeroglyphs } from "../../ethereum/yeroglyphs";
import { getSignerHandler } from "../../ethereum/web3";
import { setGridData, drawSVG } from "../../helpers/drawGlyph";
import DisplayGlyph from "../../components/Glyphs/DisplayGlyph";
import GlyphContainer from "../../components/Glyphs/GlyphContainer";

export default function NFTs() {

    const [svgs, setSvgs] = useState<string[]>([]);

    useEffect(() => {
        async function getNFTs() {
            const [signer] = await getSignerHandler();
            const yeroglyphs = await getYeroglyphs();

            if(!signer) return;
            const signerAddress = await signer.getAddress();

            let nbOfNftsOwned;
            try {
                nbOfNftsOwned = await yeroglyphs.balanceOf(signerAddress);
            } catch (error) {
                console.log(error);
            }

            for(let i = 0; i < nbOfNftsOwned; i++) {
                const id = await yeroglyphs.tokenOfOwnerByIndex(signerAddress, i);
                const tokenURI = await yeroglyphs.tokenURI(id);
                getImages(tokenURI);
            }
        }

        function getImages(tokenURI: string) {
            const rawTokenURI = tokenURI.slice(30);
            const grid = rawTokenURI.split("%0A");

            const gridData = setGridData(grid);
            const svg = drawSVG(gridData);
            const encodedSVG = encodeSVG(svg);
            setSvgs(prevState => [...prevState, encodedSVG]);
        }

        function encodeSVG(_svg: string) {
            var svg = unescape(encodeURIComponent(_svg));
            var base64SVG = window.btoa(svg);
            var imgSource = `data:image/svg+xml;base64,${base64SVG}`;
            return imgSource;
        }

        getNFTs();

    }, []);
    


    
  return (
    <React.Fragment>
        <MyAppBar />
        <AppContainer>
            <GlyphContainer>
                {svgs.map(svg => <DisplayGlyph key={svg} src={svg} />)}
            </GlyphContainer>
        </AppContainer>
    </React.Fragment>
  );
}