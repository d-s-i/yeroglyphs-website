import { ethers } from "ethers";
import yeroglyphsABI from "./abis/yeroglyphs.json";
import { getSignerHandler } from "./web3";

// const yeroglyphsAddress = "0x890e7E72f4630CE1E802fC05270490bCdDA174Ab"; 
const yeroglyphsAddress = "0x00C582c694a2B81B6a4d36529ec26DC5Cf8A6005"; // mainnet

async function getYeroglyphs() {
    const [signer] = await getSignerHandler();
    const yeroglyphs = new ethers.Contract(yeroglyphsAddress, yeroglyphsABI, signer);
    return yeroglyphs;
}

export { getYeroglyphs, yeroglyphsAddress };