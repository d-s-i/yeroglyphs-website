import React, { useEffect, useState } from "react";
import Link from "next/link";

import Modal from "./Modals/Modal";
import { useAuthContext } from "../../store/authContext";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import UnstyledButtonCustom from "./Buttons/MySVGButton";
import { styled } from "@mui/material/styles";
import "@fontsource/eb-garamond";

import styles from "./MyAppBar.module.css";

import network from "../../ethereum/network";
 
const CustomizedAppBar = styled(AppBar)`
  background-color: #C913C3;
`;

interface ErrorState {
    isError: boolean;
    message: string;
}

const INITIAL_ERROR_STATE: ErrorState = { isError: false, message: ""};

function MyAppBar() {

    const [buttonText, setButtonText] = useState<string>("Login");
    const [error, setError] = useState<ErrorState>(INITIAL_ERROR_STATE);

    const authContext = useAuthContext();

    useEffect(() => {

        function getButtonText(_signerAddress: string) {
            const shortenedAddress = `${_signerAddress.slice(0, 5)}...${_signerAddress.slice(38)}`;
            setButtonText(shortenedAddress);
        }

        async function connect() {
            getButtonText(authContext.signerAddress);

            if(!authContext.isNetworkRight) {
                setError((prevState) => { 
                    let errorObject = Object.assign({}, prevState);  
                    errorObject = { isError: true, message: `Please connect to the ${network.name} network`};                
                    return errorObject;  
                 });
            } else {
                setError((prevState) => { 
                    let errorObject = Object.assign({}, prevState);  
                    errorObject = INITIAL_ERROR_STATE;                
                    return errorObject;  
                 });
            }
        }

        connect();
    }, [authContext]);

    return(
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <CustomizedAppBar position="static" sx={{padding: "0% 17.5% 0% 17.5%" }} >
                    <Toolbar>
                        <Typography variant="h2" component="div" sx={{ flexGrow: 1, fontFamily: "'EB Garamond'" }}>
                            <span className={styles["redirection-menu"]} >
                                <Link href={"https://my.frog.tech/619d074031d46"} passHref>
                                    Ᵹ Yero
                                </Link>   
                            </span>
                        </Typography>
                    <UnstyledButtonCustom>{buttonText}</UnstyledButtonCustom>
                    </Toolbar>
                </CustomizedAppBar>
            </Box>
            {error.isError && <Modal message={error.message} onCloseModal={() => {}} displayButton={false} />}
        </React.Fragment>
    );
}

export default MyAppBar;