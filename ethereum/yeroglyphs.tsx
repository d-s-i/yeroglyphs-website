import { ethers } from "ethers";
import yeroglyphsABI from "./abis/yeroglyphs.json";
import { getSignerHandler } from "./web3";

const yeroglyphsAddress = "0xb32729F4Fe055CFe0b489CE2C5E70D66A5E515fE"; 

async function getYeroglyphs() {
    const [signer] = await getSignerHandler();
    const yeroglyphs = new ethers.Contract(yeroglyphsAddress, yeroglyphsABI, signer);
    return yeroglyphs;
}

export { getYeroglyphs, yeroglyphsAddress };