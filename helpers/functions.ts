import { Contract, ethers, Signer, BigNumber } from "ethers";
import { getYeroglyphs } from "../ethereum/yeroglyphs";
import ERC721ABI from "../ethereum/abis/ERC721ABI.json";
import ERC1155ABI from "../ethereum/abis/ERC1155ABI.json";

import { 
    ImageStateProps, 
    AuthContextType, 
    FullImageState, 
    NftState, 
} from "./types";

import { getImages } from "./drawGlyph";

export const shortenAddress = function(address: string) {
    return `${address.slice(0, 5)}...${address.slice(38)}`;
}

export const approveNft = async function(nftAddress: string, isERC721: boolean, operatorAddress: string, approveState: boolean, signer: Signer) {
    const abi = isERC721 ? ERC721ABI : ERC1155ABI;
    const nftContract = await new ethers.Contract(nftAddress, abi, signer);
    await nftContract.setApprovalForAll(operatorAddress, approveState);
}

export const getIsNftApproved = async function(nftAddress: string, isERC721: boolean, operatorAddress: string, signer: Signer) {
    const abi = isERC721 ? ERC721ABI : ERC1155ABI;
    const nftContract = await new ethers.Contract(nftAddress, abi, signer);

    const signerAddress = await signer.getAddress();

    const isApproved = await nftContract.isApprovedForAll(signerAddress, operatorAddress);

    return isApproved;
}

const getStaticNFTsState = async function(signerAddress: string) {
    const yeroglyphs = await getYeroglyphs();

    const nbOfNftsOwned = await yeroglyphs.balanceOf(signerAddress);
    let currImages: ImageStateProps[] = [];
    for(let i = 0; i < nbOfNftsOwned; i++) {
        const id = await yeroglyphs.tokenOfOwnerByIndex(signerAddress, i);
        const defaultIndex = await yeroglyphs.tokenIdDefaultIndex(id);
        const imageURI = await yeroglyphs.viewSpecificTokenURI(id, defaultIndex);

        const tokenURI = await yeroglyphs.tokenURI(id);
        const rawTokenURI = Buffer.from(tokenURI.substring(29), "base64").toString();
        const isGenesis = rawTokenURI.includes("true");

        const encodedSVG = getImages(imageURI);
        currImages.push({ svg: encodedSVG, id: id, isGenesis: isGenesis });
    }

    if(typeof(currImages) === "undefined") {
        throw new Error("Couldn't fetch NFTs");
    }

    return [...currImages];
}

const getCurrentNFTsState = async function(signerAddress: string) {
    const yeroglyphs = await getYeroglyphs();

    const nbOfNftsOwned = await yeroglyphs.balanceOf(signerAddress);
    let currImages: ImageStateProps[] = [];
    for(let i = 0; i < nbOfNftsOwned; i++) {
        const id = await yeroglyphs.tokenOfOwnerByIndex(signerAddress, i);
        const imageURI = await yeroglyphs.viewCurrentTokenURI(id);

        const tokenURI = await yeroglyphs.tokenURI(id);
        const rawTokenURI = Buffer.from(tokenURI.substring(29), "base64").toString();
        const isGenesis = rawTokenURI.includes("true");

        const encodedSVG = getImages(imageURI);
        currImages.push({ svg: encodedSVG, id: id, isGenesis: isGenesis });
    }

    if(typeof(currImages) === "undefined") {
        throw new Error("Couldn't fetch NFTs");
    }

    return [...currImages];
}

export const setCurrentNftsState = async function(
    stateFn: { setLoadingFn: React.Dispatch<React.SetStateAction<boolean>>, setNftStateFn: React.Dispatch<React.SetStateAction<ImageStateProps[]>> },
    authContext: AuthContextType,
) {
    stateFn.setLoadingFn(true);
    const signerAddress = authContext.signerAddress;

    if(!signerAddress) return;
    if(!authContext.isNetworkRight) return;

    await setCurrentNftStateAndHandleErrors(stateFn.setNftStateFn, signerAddress);

    stateFn.setLoadingFn(false);
}

const setCurrentNftStateAndHandleErrors = async function(
    setNftStateFn: React.Dispatch<React.SetStateAction<ImageStateProps[]>>,
    signerAddress: string
) {
    try {
        const nftState = await getCurrentNFTsState(signerAddress);
        setNftStateFn(nftState);
    } catch(error) {
        console.log(error);
    }
}

export const setStaticNftsState = async function(
    stateFn: { setLoadingFn: React.Dispatch<React.SetStateAction<boolean>>, setNftStateFn: React.Dispatch<React.SetStateAction<ImageStateProps[]>> },
    authContext: AuthContextType,
) {
    stateFn.setLoadingFn(true);
    const signerAddress = authContext.signerAddress;

    if(!signerAddress) return;
    if(!authContext.isNetworkRight) return;

    await setStaticNftStateAndHandleErrors(stateFn.setNftStateFn, signerAddress);

    stateFn.setLoadingFn(false);
}

const setStaticNftStateAndHandleErrors = async function(
    setNftStateFn: React.Dispatch<React.SetStateAction<ImageStateProps[]>>,
    signerAddress: string
) {
    try {
        const nftState = await getStaticNFTsState(signerAddress);
        setNftStateFn(nftState);
    } catch(error) {
        console.log(error);
    }
}

const getERC721Balance = async function(
    nftContract: Contract,
    address: string
) {
    const nftBalance = await nftContract.balanceOf(address);
    return nftBalance;
}

const getAllBlockSavedPerId = async function(address: string, nftBalance: number, yeroContract: Contract) {

    let allBlockNumberSavedPerId = [];
    for(let i = 0; i < nftBalance; i++) {
        const tokenId = await yeroContract.tokenOfOwnerByIndex(address, i);
        const blockNumberSaved = await yeroContract.totalBlockNumberSaved(tokenId);
        allBlockNumberSavedPerId.push(blockNumberSaved);
    }

    return allBlockNumberSavedPerId;
}

const getDefaultsIndexPerId = async function(address: string, nftBalance: number, yeroContract: Contract) {

    let nftsState = [];
    for(let i = 0; i < nftBalance; i++) {
        const tokenId = await yeroContract.tokenOfOwnerByIndex(address, i);
        const defaultIndex = await yeroContract.tokenIdDefaultIndex(tokenId);
        nftsState.push({ tokenId: tokenId, defaultIndex: defaultIndex });
    }

    return nftsState;
}

export const getFullNftState = async function(
    _setLoadingFn: React.Dispatch<React.SetStateAction<boolean>>, 
    _authContext: AuthContextType,
    _setFullNftStateFn: React.Dispatch<React.SetStateAction<FullImageState[]>>
) {
    _setLoadingFn(true);
    const yero = await getYeroglyphs();
    const signer = _authContext.signer;
    const signerAddress = _authContext.signerAddress;

    if(!signer) return;
    if(!_authContext.isNetworkRight) return;
    
    try {
        const nftBalance = await getERC721Balance(yero, signerAddress);
        let nbBlockNumberSavedPerId = await getAllBlockSavedPerId(signerAddress, nftBalance, yero);
        let nftsState = await getDefaultsIndexPerId(signerAddress, nftBalance, yero);

        let currImages: FullImageState[] = [];
        for(let i = 0; i < nbBlockNumberSavedPerId.length; i++) {
            const { tokenId, defaultIndex } = nftsState[i];

            let intermediateTokenURIs: string[] = [];
            let isGenesis: boolean;
            for(let j = 0; j < nbBlockNumberSavedPerId[i]; j++) {
                const imageURI = await yero.viewSpecificTokenURI(tokenId, j);
                intermediateTokenURIs.push(imageURI);
            }

            let intermediateSVG: string[] = [];
            for(const k of intermediateTokenURIs) {
                const encodedSVG = getImages(k);
                intermediateSVG.push(encodedSVG);
            }

            const tokenURI = await yero.tokenURI(tokenId);
            const rawTokenURI = Buffer.from(tokenURI.substring(29), "base64").toString();
            isGenesis = rawTokenURI.includes("true");
            
            currImages.push({ svgs: intermediateSVG, tokenId: tokenId, isGenesis: isGenesis, defaultIndex: defaultIndex });
            _setFullNftStateFn([...currImages]);
            intermediateTokenURIs = [];
            intermediateSVG = [];
        }
    } catch (error) {
        console.log(error);
    }
    _setLoadingFn(false);
}

export const getCollectionState = async function(
    _authContext: AuthContextType,
    _setNftState: React.Dispatch<React.SetStateAction<NftState>>
) {
    if(!_authContext.isNetworkRight) return;
    // const signerOrProvider = _authContext.isNetworkRight ? _authContext.signer : _authContext.provider;

    // if(signerOrProvider === undefined) return;
    const yero = await getYeroglyphs(); 

    const [currentTotalSupply, currentNbMinted] = await getYeroState(yero);
    const [currentPrice, nextPrice] = await getYeroPrice(yero, currentNbMinted);

    _setNftState((prevState) => { 
        let nftStateObject = Object.assign({}, prevState);  
        nftStateObject = { 
            totalSupply: currentTotalSupply, 
            nbMinted: currentNbMinted, 
            currentPrice: currentPrice.toString(), 
            nextPrice: nextPrice.toString() 
        };                
        return nftStateObject;  
    });
}

const getYeroState = async function(
    yero: Contract
) {

    const currentTotalSupply = await yero.TOKEN_LIMIT();
    const currentNbMinted = await yero.totalSupply();

    return [currentTotalSupply, currentNbMinted]
}

const getYeroPrice = async function(
    _yero: Contract,
    _currentNbMinted: BigNumber,
) {

    let currentPrice = await _yero.FIFTH_PRICE();
    let nextPrice = await _yero.FIFTH_PRICE();

    if(_currentNbMinted.lt(29)) {
        currentPrice = await _yero.SECOND_PRICE();
        nextPrice = await _yero.THIRD_PRICE();
    } else if(_currentNbMinted.lt(381)) {
        currentPrice = await _yero.THIRD_PRICE();
        nextPrice = await _yero.FOURTH_PRICE();
    } else if(_currentNbMinted.lt(431)) {
        currentPrice = await _yero.FOURTH_PRICE();
        nextPrice = await _yero.FIFTH_PRICE();
    } 

    return [currentPrice, nextPrice];
}

export const setNewObjectState = function(
    setFunction: React.Dispatch<React.SetStateAction<any>>,
    newObject: object
) {
    setFunction((prevState: any) => { 
        let loadingObject = Object.assign({}, prevState);  
        loadingObject = newObject;
        return loadingObject;  
      });
}

// export const canSignTx = function(
//     _authContext: AuthContextType
// ) {
//     if(!_authContext.isNetworkRight || !(_authContext.signer instanceof JsonRpcSigner)) {
//         return false;
//     }
//     return true;
// }