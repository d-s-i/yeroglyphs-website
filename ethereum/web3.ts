import { ethers } from "ethers";
import { JsonRpcSigner, JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import network from "./network";
 
declare let window: any;

export async function getSignerHandler() {
    if (typeof(window) !== "undefined" && typeof(window.ethereum) !== "undefined") {
        window.ethereum.request({ method: "eth_requestAccounts" });
        await window.ethereum.enable();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        
        const walletObject: [JsonRpcSigner, Web3Provider] = [signer, provider];

        return walletObject;
    } else {
        const provider = new ethers.providers.JsonRpcProvider(network.provider);
        const walletObject: [undefined, JsonRpcProvider] = [undefined, provider];
        
        return walletObject;
    }
}

getSignerHandler();