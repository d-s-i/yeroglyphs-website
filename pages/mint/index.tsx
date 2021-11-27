import React, { useEffect, useState } from 'react';
import MyAppBar from '../../components/UI/MyAppBar';

import { getSignerHandler } from '../../ethereum/web3';
import { getYeroglyphs } from '../../ethereum/yeroglyphs';
import { ethers } from "ethers";


export default function Minting() {

    const [seed, setSeed] = useState<number>(0);

    async function mintNFT() {
        const yeroglyphs = await getYeroglyphs();

        await yeroglyphs.createGlyph(seed, { value: ethers.utils.parseEther("0.08") });
    }

    async function setSeedHandler(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        let enteredNumber = event.currentTarget.value;

        setSeed(+enteredNumber);
    }

  return (
    <React.Fragment>
        <MyAppBar />
        <input type="number" value={seed} onChange={setSeedHandler} />
        <button onClick={mintNFT} >Mint</button>
    </React.Fragment>
  );
}