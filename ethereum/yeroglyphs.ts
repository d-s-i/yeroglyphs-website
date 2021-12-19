import { ethers } from "ethers";
import yeroglyphsABI from "./abis/yeroglyphsABI.json";
import { getSignerHandler } from "./web3";

// const yeroglyphsAddress = "0xacBc7A35e99c86903e3D30Dc4dfd53714e081040"; // old yero on testnet
// const yeroglyphsAddress = "0x39BEd0D69e8aE54B18298f54FBe07F31be56DCD2" // new yero on testnet
const yeroglyphsAddress = "0xaed3Be553f26972C63c47282E68ac39572aAa361"; // mainnet

async function getYeroglyphs() {
    const [signer] = await getSignerHandler();
    const yeroglyphs = new ethers.Contract(yeroglyphsAddress, yeroglyphsABI, signer);
    return yeroglyphs;
}

export { getYeroglyphs, yeroglyphsAddress };