import React from "react";

import { getYeroglyphs } from "../../../ethereum/yeroglyphs";
import { ethers, BigNumber } from "ethers";

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

interface Props {
    seed: number | string;
    password: string;
    isValid: boolean;
    onSendingTx: (loadingState: boolean, message: string, txStatut: string) => void;
}

function MintButton(props: Props) {   

    
    async function mintNFT() {
        try {
            if(!props.isValid) {
                props.onSendingTx(true, "Please enter correct inputs", "error");
            }
            const yeroglyphs = await getYeroglyphs();
    
            props.onSendingTx(true, "Waiting for your transaction to confirm ...", "pending");

            let numTokenMinted = await yeroglyphs.totalSupply();

            let price = await yeroglyphs.FIFTH_PRICE();

            if(numTokenMinted.lt(29)) {
                price = await yeroglyphs.SECOND_PRICE();
            } else if(numTokenMinted.lt(381)) {
                price = await yeroglyphs.THIRD_PRICE();
            } else if(numTokenMinted.lt(431)) {
                price = await yeroglyphs.FOURTH_PRICE();
            } 

            const mint_tx = await yeroglyphs.createGlyph(props.seed, props.password, { value: price });
    
            const provider = yeroglyphs.signer.provider;
    
            provider?.once(mint_tx.hash, async function() {
                props.onSendingTx(true, "Your purchase have been confirmed !", "confirmed");
            });
        } catch(error: any) {
            if(error.message) {
                if(error.message.includes("Token already minted")) {
                    props.onSendingTx(true, "Seed already used, try another seed", "error");
                    return;
                }
                props.onSendingTx(true, error.message, "error");
            } else {
                props.onSendingTx(true, "An error occured", "error");
            }
        }
    }
    
    return(
        <Container maxWidth="md" sx={{ width: "100%", display: "flex", justifyContent: "center" }} >
            <Button 
                variant="outlined" 
                onClick={mintNFT}
                sx={{ 
                    fontSize: "1.5em", 
                    padding: "0% 10% 0% 10%", 
                    "&:hover" : { borderColor: "#FFD700", color: "#FFD700" }, 
                    borderColor: "#806c00", 
                    color: "#806c00" 
                }}
            >
                <span style={{ marginRight: "30%" }}>{`𓁋`}</span>
                Mint
            </Button>
        </Container>
    );
}

export default MintButton;