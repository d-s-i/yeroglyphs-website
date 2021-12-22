import React from "react";
import { useRouter } from "next/router";

import { ethers } from "ethers";
import { getMarketplace } from "../../../ethereum/marketplace";
import { getWeth } from "../../../ethereum/weth";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import GoldButton from "../../UI/Buttons/GoldButtonContained";
import { goldColor } from "../../../helpers/constant";

import TextField from "@mui/material/TextField";

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

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    backgroundColor: "#b30000", 
    display: "flex",
    alignItems: "center",
    borderRadius: "0.5em", 
    padding: "0.5% 0% 0.5% 3%",
    margin: "5% 0% 1% 0%"
}));

const MySelect = styled(Select)(({ theme }) => ({
    ".MuiSelect-select": {
        "& $notchedOutline": {
            borderColor: "red"
          },
          "&:hover $notchedOutline": {
            borderColor: "blue"
          },
          "&$focused $notchedOutline": {
            borderColor: "green"
          },
        borderColor: "red",
        "&:hover": {
            borderColor: "red"
        }
    },
    focused: {},
    notchedOutline: {},
    ".MuiSelect-icon": {
        color: "#806c00"
    }
  }));

interface ErrorType {
    isError: boolean;
    message: string;
}

const INITIAL_ERROR = {
    isError: false,
    message: ""
};

const INITIAL_DEADLINE_ITEM = 3
const INITIAL_DEADLINE = Math.round(((new Date()).getTime() / 1000) + (INITIAL_DEADLINE_ITEM * 86400));

function MakeOfferContent() {


    const [offerPrice, setOfferPrice] = React.useState<string>("");
    const [deadline, setDeadline] = React.useState<string | number>(INITIAL_DEADLINE);
    const [deadlineItem, setDeadlineItem] = React.useState<string | number>(3);
    const [error, setError] = React.useState<ErrorType>(INITIAL_ERROR);

    const router = useRouter();

    const { tokenId, nftAddress } = router.query;

    function setOfferPriceHandler(event: React.ChangeEvent<HTMLInputElement>) {
        setOfferPrice(event.currentTarget.value);
    }

    async function submitOffer() {
        try  {
            const marketplace = await getMarketplace();
            const weth = await getWeth();
            const pricePerItem = ethers.utils.parseEther(offerPrice);
            const now = (new Date()).getTime();
            await marketplace.listItem(nftAddress, tokenId, 1, weth.address, pricePerItem, Math.round(now / 1000));
        } catch(error: any) {
            console.log(error.message);
            if(error.message.includes("offer already created")) {
                setError((prevState) => { 
                    let errorObject = Object.assign({}, prevState);  
                    errorObject = { isError: true, message: "Delete your previous offer to submit a new one." };                
                    return errorObject;  
                 });
                 return;
            }
            if(error.message) {
                setError((prevState) => { 
                    let errorObject = Object.assign({}, prevState);  
                    errorObject = { isError: true, message: error.message };                
                    return errorObject;  
                 });
            } else {
                setError((prevState) => { 
                    let errorObject = Object.assign({}, prevState);  
                    errorObject = { isError: true, message: "An error occured. Please contact the admins to solve it." };                
                    return errorObject;  
                 });
            }

        }
    } 
    
    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography component="p" variant="h6" sx={{ color: "#806c00" }}>Enter your Price</Typography>
            </Grid>
            <Grid item xs={11}>
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth color="primary">
                    <OutlinedInput
                        color="primary"
                        id="outlined-adornment-price"
                        value={offerPrice}
                        onChange={setOfferPriceHandler}
                        endAdornment={<InputAdornment position="end"><span style={{ color: "#806c00" }}>wETH</span></InputAdornment>}
                        aria-describedby="outlined-price-helper-text"
                        inputProps={{
                        'aria-label': 'price',
                        }}
                        sx={{ 
                            border: "1px #806c00 solid", 
                            color: goldColor,
                            "&:hover": { borderColor: goldColor }, 
                            "&&:focus": { borderColor: "red" } 
                        }}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={11} sx={{ display: "flex", justifyContent: "flex-end", marginBottom: "3%" }}>
                <GoldButton onClick={submitOffer} >Sell</GoldButton>
            </Grid>
        </Grid>
    );
}

export default MakeOfferContent;