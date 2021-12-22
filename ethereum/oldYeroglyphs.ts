import { ethers } from "ethers";
import yeroglyphsABI from "./abis/yeroglyphsABI.json";
import { getSignerHandler } from "./web3";

// const oldYeroglyphsAddress = "0xacBc7A35e99c86903e3D30Dc4dfd53714e081040"; // old yero on testnet
const oldYeroglyphsAddress = "0x00C582c694a2B81B6a4d36529ec26DC5Cf8A6005"; // mainnet

async function getOldYeroglyphs() {
    const [signer] = await getSignerHandler();
    const yeroglyphs = new ethers.Contract(oldYeroglyphsAddress, yeroglyphsABI, signer);
    return yeroglyphs;
}

export { getOldYeroglyphs, oldYeroglyphsAddress };