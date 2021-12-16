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

import GoldButton from "../../UI/Buttons/GoldButton";
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

interface ErrorType {
    isError: boolean;
    message: string;
}

const INITIAL_ERROR = {
    isError: false,
    message: ""
};

function MakeOfferContent() {

    const [offerPrice, setOfferPrice] = React.useState<string>("");
    const [deadline, setDeadline] = React.useState<string>("0");
    const [deadlineItem, setDeadlineItem] = React.useState<string>("3");
    const [error, setError] = React.useState<ErrorType>(INITIAL_ERROR);

    const router = useRouter();

    const { id, nftAddress } = router.query;

    function setOfferPriceHandler(event: React.ChangeEvent<HTMLInputElement>) {
        setOfferPrice(event.currentTarget.value);
    }

    function setDeadlineHandler(event: SelectChangeEvent) {

        const now = new Date();
        const timestamp = now.getTime();
        setDeadlineItem(event.target.value);

        const deadline = Math.round((timestamp / 1000) + (parseFloat(event.target.value) * 86400));
        
        setDeadline(deadline.toString());

    }

    async function submitOffer() {
        try  {
            const marketplace = await getMarketplace();
            const weth = await getWeth();
            const pricePerItem = ethers.utils.parseEther(offerPrice);
            await marketplace.createOffer(nftAddress, id, weth.address, 1, pricePerItem, deadline);
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
                <Typography component="p" variant="h6" sx={{ color: "#806c00" }}>Enter your offer</Typography>
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
                            "&:focus": { borderColor: "red" } 
                        }}
                    />
                    <FormHelperText id="outlined-price-helper-text" sx={{ color: "#806c00", fontSize: "1em" }}>Price</FormHelperText>
                </FormControl>
                {/* <CssTextField
                    fullWidth
                    id="demo-helper-text-aligned"
                    label="Price"
                    FormHelperTextProps={{ style: { color: "#806c00", fontSize: "0.9em" } }}
                    endAdornment={<InputAdornment position="end">wETH</InputAdornment>}
                    InputProps={{ style: { color: goldColor } }}
                    value={offerPrice}
                    onChange={setOfferPriceHandler}
                /> */}
            </Grid>
            <Grid item xs={11}>
                <Typography component="p" variant="h6" sx={{ paddingBottom: "2%" }} color="primary">Deadline</Typography>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Timeline</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={deadlineItem}
                        label="Deadline"
                        MenuProps={{ color: "#f3f4f6" }}
                        inputProps={{ color: "#f3f4f6" }}
                        sx={{ color: "#f3f4f6", borderColor: "#f3f4f6" }}
                        onChange={setDeadlineHandler}
                    >
                    <MenuItem value={3}>3 days</MenuItem>
                    <MenuItem value={14}>2 weeks</MenuItem>
                    <MenuItem value={30}>1 month</MenuItem>
                    <MenuItem value={90}>3 month</MenuItem>
                    <MenuItem value={180}>6 month</MenuItem>
                    </Select>
                </FormControl>
                {error.isError && (
                    <Item>
                    <WarningAmberIcon />
                    <Typography component="p" variant="h6">{error.message}</Typography>
                    </Item>
                )}
            </Grid>
            <Grid item xs={11} sx={{ display: "flex", justifyContent: "flex-end", marginBottom: "3%" }}>
                <GoldButton onClick={submitOffer} >Make Offer</GoldButton>
            </Grid>
        </Grid>
    );
}

export default MakeOfferContent;