import { JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import { JsonRpcSigner } from "@ethersproject/providers";

export type CustomProvider = JsonRpcProvider | Web3Provider | undefined;

export type CustomSigner = JsonRpcSigner | undefined;

export type CustomSignerOrProvider = CustomSigner | CustomProvider;

export interface ImageStateProps {
    id: string;
    svg: string;
    isGenesis: boolean;
}

export interface AuthContextType {
    signer: CustomSigner;
    signerAddress: string;
    provider: CustomProvider;
    isNetworkRight: boolean;
}

export interface FullImageState {
    tokenId: string;
    isGenesis: boolean;
    defaultIndex: string;
    svgs: string[];
}

export interface NftState {
    totalSupply: string;
    nbMinted: string;
    currentPrice: string;
    nextPrice: string;
}

export type SeedInput = number | string;