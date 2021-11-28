import React, { useEffect, useState } from "react";
import Link from "next/link";

import { useAuthContext } from "../../../store/authContext";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import Modal from "../Modals/Modal";
import AppBar from "@mui/material/AppBar";
import MySVGButton from "../Buttons/MySVGButton";
import ButtonLinks from "../Buttons/ButtonLinks";
import { styled } from "@mui/material/styles";

import styles from "./MyAppBar.module.css";

import network from "../../../ethereum/network";
 
const CustomizedAppBar = styled(AppBar)`
  background-color: #000000;
`;

interface Props {
    isMintReleased: boolean;
}

interface ErrorState {
    isError: boolean;
    message: string;
}

const INITIAL_ERROR_STATE: ErrorState = { isError: false, message: ""};

function MyAppBar(props: Props) {

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

            if(!authContext.isNetworkRight && props.isMintReleased) {
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
                <CustomizedAppBar position="static">
                    <Toolbar>
                        <Grid container justifyContent="flex-end" alignItems="center">
                            <Typography variant="h2" component="div" sx={{ flexGrow: 1, color: "#FFD700" }}>
                                <span className={styles["redirection-menu"]} >
                                    <Link href="/" passHref>
                                        𓁋 Yero
                                    </Link>   
                                </span>
                            </Typography>
                            <Typography component="p" variant="h6" sx={{marginRight: "10%"}} color="primary" >Collection #1 - Launching date TBD…</Typography>
                            <ButtonLinks isReadyForProd={props.isMintReleased} />
                            <MySVGButton>{buttonText}</MySVGButton>
                        </Grid>
                    </Toolbar>
                </CustomizedAppBar>
            </Box>
            {error.isError && <Modal message={error.message} onCloseModal={() => {}} displayButton={false} />}
        </React.Fragment>
    );
}

export default MyAppBar;