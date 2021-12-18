import { ethers } from "ethers";
import yeroglyphsABI from "./abis/yeroglyphsABI.json";
import { getSignerHandler } from "./web3";

// const yeroglyphsAddress = "0x84AE1a725d97C41c40DFBf3269f0c4bB0E513CF3"; 
const yeroglyphsAddress = "0x00C582c694a2B81B6a4d36529ec26DC5Cf8A6005"; // mainnet

async function getYeroglyphs() {
    const [signer] = await getSignerHandler();
    const yeroglyphs = new ethers.Contract(yeroglyphsAddress, yeroglyphsABI, signer);
    return yeroglyphs;
}

export { getYeroglyphs, yeroglyphsAddress };