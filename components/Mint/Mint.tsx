import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../store/authContext";

import { getYeroglyphs } from "../../ethereum/yeroglyphs";
import { ethers } from "ethers";

import styles from "./Mint.module.css";
import { Typography } from "@mui/material";

interface NftState {
    totalSupply: string;
    nbMinted: string;
}

const INITIAL_NFT_STATE: NftState = {
    totalSupply: "512",
    nbMinted: "0"
}

function Mint() {
    
    const [seed, setSeed] = useState<number>(0);
    const [nftState, setNftState] = useState<NftState>(INITIAL_NFT_STATE);
    const authContext = useAuthContext();

    async function mintNFT() {
        const yeroglyphs = await getYeroglyphs();

        await yeroglyphs.createGlyph(seed, { value: ethers.utils.parseEther("0.08") });
    }

    async function setSeedHandler(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        let enteredNumber = event.currentTarget.value;

        setSeed(+enteredNumber);
    }

    useEffect(() => {
        async function getCollectionState() {
            const yero = await getYeroglyphs(); 

            const currentTotalSupply = await yero.TOKEN_LIMIT();
            const currentNbMinted = await yero.totalSupply();
            setNftState((prevState) => { 
                let nftStateObject = Object.assign({}, prevState);  
                nftStateObject = { totalSupply: currentTotalSupply, nbMinted: currentNbMinted };                
                return nftStateObject;  
             });

        }

        getCollectionState();
    }, [authContext]);

    return(
        <div className={styles["mint-container"]} >
            <div className={styles["mint-box"]}>
                <Typography sx={{color: "white"}} component="p" variant="subtitle1">{`${nftState.nbMinted}/${nftState.totalSupply}`}</Typography>
                <input type="number" value={seed} onChange={setSeedHandler} />
                <button onClick={mintNFT} >Mint</button>
            </div>
      </div>
    );
}

export default Mint;