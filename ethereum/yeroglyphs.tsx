import { ethers } from "ethers";
import yeroglyphsABI from "./abis/yeroglyphs.json";
import { getSignerHandler } from "./web3";

const yeroglyphsAddress = "0xfd64Fb65Ca965908AcE30CcB9bB44F62A7a18b1e"; 

async function getYeroglyphs() {
    const [signer,] = await getSignerHandler();
    const yeroglyphs = new ethers.Contract(yeroglyphsAddress, yeroglyphsABI, signer);
    return yeroglyphs;
}

export { getYeroglyphs, yeroglyphsAddress };