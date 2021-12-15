import { ethers } from "ethers";
import marketplaceABI from "./abis/marketplaceABI.json";
import { getSignerHandler } from "./web3";

const marketplaceAddress = "0x6910Fe56e9715A69b31bDbA0F5301e8385d53482"; 

async function getMarketplace() {
    const [signer] = await getSignerHandler();
    const marketplace = new ethers.Contract(marketplaceAddress, marketplaceABI, signer);
    return marketplace;
}

export { getMarketplace, marketplaceAddress };