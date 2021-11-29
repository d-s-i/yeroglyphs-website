import React, { useState, useEffect, useContext, ReactNode, createContext } from "react";
import { getSignerHandler } from "../ethereum/web3";
import { JsonRpcSigner, JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import network from "../ethereum/network";

declare let window: any;

export type Signer = JsonRpcSigner | undefined;

type Provider = JsonRpcProvider | Web3Provider | undefined;

interface authContextType {
    signer: Signer;
    signerAddress: string;
    provider: Provider;
    isNetworkRight: boolean;
};

const authContextDefaultValues: authContextType = {
    signer: undefined,
    signerAddress: "",
    provider: undefined,
    isNetworkRight: true
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuthContext() {
    return useContext<authContextType>(AuthContext);
}

type Props = {
    children: ReactNode;
};

export function AuthContextProvider({ children }: Props) {
    const [signer, setSigner] = useState<Signer>();
    const [signerAddress, setSignerAddress] = useState<string>("");
    const [provider, setProvider] = useState<Provider>();
    const [isNetworkRight, setIsNetworkRight] = useState<boolean>(false);


    async function loginHandler() {
        const walletObject = await getSignerHandler();

        if(walletObject[0] instanceof JsonRpcSigner) {
            const chainId = await walletObject[0].getChainId();
            const snAddress = await walletObject[0].getAddress();
            onNetworkChange(chainId);
            setSignerAddress(snAddress);
        }
        if(walletObject[0] === undefined) {
            const chainId = (await walletObject[1].getNetwork()).chainId;
            onNetworkChange(chainId);
        }

        setSigner(walletObject[0]);
        setProvider(walletObject[1]);
    }

    useEffect(() => {
        if (typeof(window) !== "undefined" && typeof(window.ethereum) !== "undefined") {
            loginHandler();
            window.ethereum.on('accountsChanged', function () {
                loginHandler();
            });
            window.ethereum.on('chainChanged', function(networkId: number){
                onNetworkChange(networkId);
            });
        }
    }, []);

    function onNetworkChange(networkId: number) {
        if(+networkId === network.chainId) {
            setIsNetworkRight(true);
        } else {
            setIsNetworkRight(false);
        }
    }

    let accountState = {
        signer: signer,
        signerAddress: signerAddress,
        provider: provider,
        isNetworkRight: isNetworkRight
    };
    
    return (
        <AuthContext.Provider value={accountState}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;