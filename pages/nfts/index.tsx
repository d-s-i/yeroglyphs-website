import React, { useEffect } from "react";
import MyAppBar from "../../components/UI/MyAppBar";

import { getYeroglyphs } from "../../ethereum/yeroglyphs";
import { getSignerHandler } from "../../ethereum/web3";
import { draw, setGridData } from "../../helpers/drawGlyph";
import DisplayGlyph from "../../components/DisplayGlygh";



export default function NFTs() {


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
                const isElement = document.getElementById(`yeroglyphs-${id}`);
                if(!isElement) {
                    getImages(tokenURI, id);
                }
            }
        }

        function getImages(tokenURI: string, id: number) {
            const rawTokenURI = tokenURI.slice(30);
            const grid = rawTokenURI.split("%0A");

            const gridData = setGridData(grid);
            draw(gridData, id);
        }

        getNFTs();

    }, []);
    


    
  return (
    <React.Fragment>
        <MyAppBar />
        <DisplayGlyph />
    </React.Fragment>
  );
}