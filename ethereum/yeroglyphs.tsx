import { ethers } from "ethers";
import yeroglyphsABI from "./abis/yeroglyphs.json";
import { getSignerHandler } from "./web3";

const yeroglyphsAddress = "0x7e995E7c4f295736821e9DF5BC7Ae27fC0a68069"; 

async function getYeroglyphs() {
    const [signer,] = await getSignerHandler();
    const yeroglyphs = new ethers.Contract(yeroglyphsAddress, yeroglyphsABI, signer);
    return yeroglyphs;
}

export { getYeroglyphs, yeroglyphsAddress };