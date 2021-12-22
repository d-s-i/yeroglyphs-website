import React from "react";
import { useAuthContext } from "../../store/authContext";

import { getOldYeroglyphs } from "../../ethereum/oldYeroglyphs";
import { SeedInput } from "../../helpers/types";

import ClaimButton from "../UI/Buttons/ClaimButton";
import TxHandler from "../UI/Modals/TxHandler";
import { goldColor } from "../../helpers/constant";

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

function Claim() {
    
  const [seed, setSeed] = React.useState<SeedInput>("");
  const [tokenId, setTokenId] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [isValid, setisValid] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<LoadingState>(INITIAL_LOADING_STATE);
  const [isButtonLoading, setIsButtonLoading] = React.useState<boolean>(false);
  const [idsToClaim, setIdsToClaim] = React.useState<number[]>([]);

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

      setSeed(enteredNumber);
      setisValid(true);
  }

  async function setTokenIdHandler(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    let enteredNumber = event.currentTarget.value;
    if(isNaN(+enteredNumber)) return;
    if(+enteredNumber === 0 || enteredNumber === "") {
      setTokenId("");
      setisValid(false);
      return;
    };

    setTokenId(enteredNumber);
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

    React.useEffect(() => {

      async function getAllOwnerIds() {
        const oldYero = await getOldYeroglyphs();
        const signer = oldYero.signer;

        if(!signer) return;
        const signerAddress = await signer.getAddress()

        const balance = await oldYero.balanceOf(signerAddress);

        let ids: number[] = [];

        for(let i = 0; i < balance; i++) {
          const id = await oldYero.tokenOfOwnerByIndex(signerAddress, i);
          ids.push(+id);
        }

        setIdsToClaim(ids);
      }
      
      getAllOwnerIds();
    }, [authContext]);

  return(
      <Container maxWidth="lg" sx={{ 
        backgroundColor: "#000000", 
        padding: "5% 3% 3% 3%", 
        borderRadius: "1em"
      }}>
        <Grid container sx={{ padding: "0% 10% 0% 10%", display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
          <Grid container>
            <Grid item xs={12}>
              <Typography component="p" variant="h3" color="primary" align="center" sx={{ margin: "0% 0% 5% 0%" }}>
                Enter your tokenId, your seed (can be different) and  your password if you had any 
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", marginBottom: "8%" }} >
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
          <Grid item lg={4} md={4} sm={12} xs={12} sx={{ display: "flex", justifyContent: "center", marginBottom: "8%" }} >
            <CssTextField
                  helperText="The id of your old Yero"
                  id="demo-helper-text-aligned"
                  label="tokenId"
                  FormHelperTextProps={{ style: { color: "#806c00", fontSize: "0.9em" } }}
                  InputProps={{ style: { color: goldColor } }}
                  value={tokenId} 
                  onChange={setTokenIdHandler}
              />  
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12} sx={{ display: "flex", justifyContent: "center", marginBottom: "8%" }} >
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
                helperText="Can be left empty"
                id="demo-helper-text-aligned"
                label="Password (optional)"
                FormHelperTextProps={{ style: { color: "#806c00", fontSize: "0.9em" } }}
                InputProps={{ style: { color: goldColor } }}
                value={password}
                onChange={setPasswordHandler}
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12} sx={{ display: "flex", justifyContent: "center" }}>
              <ClaimButton seed={seed} password={password} tokenId={tokenId} isValid={isValid} onSendingTx={setLoadingState} />
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
              <Typography component="p" variant="subtitle1" color="primary">{`you can claim those ids: ${idsToClaim}`}</Typography>
            </Grid>
            {isLoading.isLoading && <TxHandler message={isLoading.message} statut={isLoading.statut} onClose={stopTxNotif} />}
        </Grid>
      </Container>
  );
}

export default Claim;