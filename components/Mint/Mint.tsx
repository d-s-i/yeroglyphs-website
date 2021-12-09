import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../store/authContext";

import { getYeroglyphs } from "../../ethereum/yeroglyphs";

import MintButton from "../UI/Buttons/MintButton";
import TxHandler from "../UI/Modals/TxHandler";
import { goldColor } from "../../constant";

import styles from "./Mint.module.css";
import Typography from "@mui/material/Typography";
import LoadingButton from '@mui/lab/LoadingButton';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { styled } from '@mui/material/styles';

const CssTextField = styled(TextField)({
  "& label" : {
    color: "#806c00"
  },
    '& label.Mui-focused': {
      color: '#FFD700',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#806c00',
      },
      '&:hover fieldset': {
        borderColor: '#FFD700',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#FFD700',
      }
    }
  });

interface NftState {
    totalSupply: string;
    nbMinted: string;
}

const INITIAL_NFT_STATE: NftState = {
    totalSupply: "512",
    nbMinted: "0"
}

interface Props {
    isMintReleased: boolean;
}

type SeedInput = number | string;

interface LoadingState {
  isLoading: boolean;
  message: string;
  statut: string;
}

const INITIAL_LOADING_STATE = {
  isLoading: false,
  message: "",
  statut: "",
}

function Mint(props: Props) {
    
  const [seed, setSeed] = useState<SeedInput>("");
  const [password, setPassword] = useState<string>("");
  const [isValid, setisValid] = useState<boolean>(false);
  const [nftState, setNftState] = useState<NftState>(INITIAL_NFT_STATE);
  const [isLoading, setIsLoading] = React.useState<LoadingState>(INITIAL_LOADING_STATE);
  const [isButtonLoading, setIsButtonLoading] = React.useState<boolean>(false);

  const authContext = useAuthContext();

  async function setSeedHandler(event: React.ChangeEvent<HTMLInputElement>) {
      event.preventDefault();
      let enteredNumber = event.currentTarget.value;
      if(isNaN(+enteredNumber)) return;
      if(+enteredNumber === 0 || enteredNumber === "") {
        setSeed("");
        setisValid(false);
        return;
      };

      setSeed(+enteredNumber);
      setisValid(true);
  }

  async function setPasswordHandler(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    setPassword(event.currentTarget.value);
  }

  function setLoadingState(loadingState: boolean, message: string, txStatut: string) {
    setIsLoading((prevState) => { 
      let loadingObject = Object.assign({}, prevState);  
      loadingObject = { isLoading: loadingState, message: message, statut: txStatut };
      return loadingObject;  
    });
  }

  async function stopTxNotif() {
    setIsLoading((prevState) => {   
      let loadingObject = Object.assign({}, prevState);  
      loadingObject = { ...INITIAL_LOADING_STATE };                
      return loadingObject;  
    });
  }

  function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  function getRandomNumber() {
    setIsButtonLoading(true);
    setSeed("");
    setTimeout(function() {
      const randomSeed = getRandomArbitrary(0, Number.MAX_SAFE_INTEGER);
      setSeed(Math.trunc(randomSeed));
      setIsButtonLoading(false);
    }, 1500);
  }

    useEffect(() => {
        async function getCollectionState() {
            if(!props.isMintReleased || !authContext.isNetworkRight) return;
            const yero = await getYeroglyphs(); 

            const currentTotalSupply = await yero.TOKEN_LIMIT();
            const currentNbMinted = await yero.totalSupply();
            setNftState((prevState) => { 
                let nftStateObject = Object.assign({}, prevState);  
                nftStateObject = { totalSupply: currentTotalSupply, nbMinted: currentNbMinted };                
                return nftStateObject;  
             });
        }

        getCollectionState();
    }, [authContext]);

  return(
      <Container maxWidth="lg" sx={{ 
        backgroundColor: "#000000", 
        padding: "5% 3% 8% 3%", 
        borderRadius: "1em"
      }}>
        <Typography component="p" variant="h3" color="primary" align="center" sx={{ margin: "0% 0% 5% 0%" }}>
          {`Remaining Yero NFTs: ${parseFloat(nftState.totalSupply) - parseFloat(nftState.nbMinted)}/${nftState.totalSupply}`}
        </Typography>
        <Grid container sx={{ padding: "0% 10% 0% 10%", display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", marginBottom: "5%" }} >
            <LoadingButton 
              onClick={getRandomNumber} 
              loading={isButtonLoading} 
              variant="outlined"
              size="large"
              loadingPosition="center"
              sx={{
                textTransform : "none",
                fontSize: "1.3em", 
                "&:hover" : { borderColor: "#FFD700", color: "#FFD700" }, 
                borderColor: "#806c00", 
                color: "#806c00",
                ".MuiLoadingButton-loadingIndicator": { color: goldColor } 
              }}
            >
              Generate Random Seed
            </LoadingButton>
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12} sx={{ display: "flex", justifyContent: "center", marginBottom: "5%" }} >
            <CssTextField
                  helperText="Please enter a number (max 2^255)"
                  id="demo-helper-text-aligned"
                  label="Seed"
                  FormHelperTextProps={{ style: { color: "#806c00", fontSize: "0.9em" } }}
                  InputProps={{ style: { color: goldColor } }}
                  value={seed} 
                  onChange={setSeedHandler}
              />  
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12} sx={{ display: "flex", justifyContent: "center", marginBottom: "5%" }}>
              <CssTextField
                  helperText="Not required"
                  id="demo-helper-text-aligned"
                  label="Password (optional)"
                  FormHelperTextProps={{ style: { color: "#806c00", fontSize: "0.9em" } }}
                  InputProps={{ style: { color: goldColor } }}
                  value={password}
                  onChange={setPasswordHandler}
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12} sx={{ display: "flex", justifyContent: "center" }}>
              <MintButton seed={seed} password={password} isValid={isValid} onSendingTx={setLoadingState} />
            </Grid>
            {isLoading.isLoading && <TxHandler message={isLoading.message} statut={isLoading.statut} onClose={stopTxNotif} />}
        </Grid>
      </Container>
  );
}

export default Mint;