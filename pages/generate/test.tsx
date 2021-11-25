import React, { useEffect, useState } from "react";
import Image from "next/image";

import MyAppBar from "../../components/UI/MyAppBar";
import AppContainer from "../../components/UI/AppContainer";

import { getYeroglyphs } from "../../ethereum/yeroglyphs";
import { getSignerHandler } from "../../ethereum/web3";
import { drawSVG, setGridData } from "../../helpers/drawGlyph";

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
                const tokenURI = await yeroglyphs.viewCurrentTokenURI(id);

                const encodedSVG = getImages(tokenURI);
                setSvgs(prevState => [...prevState, encodedSVG]);

            }
        }

        function getImages(tokenURI: string) {
            const rawTokenURI = tokenURI.slice(30);
            const grid = rawTokenURI.split("%0A");

            const gridData = setGridData(grid);
            const svg = drawSVG(gridData);
            return encodeSVG(svg);
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
            {svgs.map(svg => <Image key={svg} src={svg} width="320" height="320" />)}
        </AppContainer>
    </React.Fragment>
  );
}