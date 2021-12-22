import React from "react";
import { getSignerHandler } from "../ethereum/web3";
import { ethers } from "ethers";
import { JsonRpcSigner } from "@ethersproject/providers";
import { AuthContextType, CustomSigner, CustomProvider } from "../helpers/types";
import network from "../ethereum/network";

declare let window: any;

const authContextDefaultValues: AuthContextType = {
    signer: undefined,
    signerAddress: "",
    provider: undefined,
    isNetworkRight: true
};

const AuthContext = React.createContext<AuthContextType>(authContextDefaultValues);

export function useAuthContext() {
    return React.useContext<AuthContextType>(AuthContext);
}

type Props = {
    children: React.ReactNode;
};

export function AuthContextProvider({ children }: Props) {
    const [signer, setSigner] = React.useState<CustomSigner>();
    const [signerAddress, setSignerAddress] = React.useState<string>("");
    const [provider, setProvider] = React.useState<CustomProvider>();
    const [isNetworkRight, setIsNetworkRight] = React.useState<boolean>(false);

    async function loginHandler() {
        const walletObject = await getSignerHandler();

        let chainId: number = 0;
        if(walletObject[0] instanceof JsonRpcSigner) {
            chainId = await walletObject[0].getChainId();
            const srAddress = await walletObject[0].getAddress();
            onNetworkChange(chainId);
            setSignerAddress(srAddress);
        }
        if(walletObject[0] === undefined) {
            chainId = (await walletObject[1].getNetwork()).chainId;
            onNetworkChange(chainId);
        }

        if(chainId !== network.chainId) {
            setProvider(new ethers.providers.JsonRpcProvider(network.provider));
        } else {
            setProvider(walletObject[1]);
        }

        setSigner(walletObject[0]);
    }

    React.useEffect(() => {
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