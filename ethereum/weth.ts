import { getSignerHandler } from "./web3";
import { ethers } from "ethers";
import WethABI from "./abis/ERC20ABI.json";
import network from "./network";

export async function getWeth() {
    let wethAddress: string;
    if(network.chainId === 4) {
        wethAddress = "0xc778417E063141139Fce010982780140Aa0cD5Ab";
    } else if(network.chainId === 288) {
        wethAddress = "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000";
    } else {
        throw new Error(`No address provided for ${network.name}`);
    }

    const [signer] = await getSignerHandler();
    const weth = new ethers.Contract(wethAddress, WethABI, signer);
    return weth;
}