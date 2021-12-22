import { JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import { JsonRpcSigner } from "@ethersproject/providers";

export type Provider = JsonRpcProvider | Web3Provider | undefined;

export type Signer = JsonRpcSigner | undefined;

export interface ImageStateProps {
    id: string;
    svg: string;
    isGenesis: boolean;
}

export interface authContextType {
    signer: Signer;
    signerAddress: string;
    provider: Provider;
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