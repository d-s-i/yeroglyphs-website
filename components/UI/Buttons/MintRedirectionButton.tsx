import React from "react";
import Link from "next/link";

import Button from "@mui/material/Button";

interface Props {
    isMintReleased: boolean;
}

function MintRedirectionButton(props: Props) {

    const disabledState = {
        border: "#806c00",
        font: "#806c00",
        cursor: "not-allowed",
        message: "Minting locked..."
    };
    const allowedState = {
        border: "#fff099",
        font: "#fff099",
        cursor: "pointer",
        message: "Mint Now!"
    };

    const buttonState = props.isMintReleased ? allowedState : disabledState;
    
    return(
        <Link href={props.isMintReleased ? "/mint" : "/"} passHref>
            <Button 
                variant="outlined" 
                sx={{
                    borderColor: "#FFD700", 
                    color: " #FFD700", 
                    padding: "0% 5% 0% 5%",
                    fontSize: "2em",
                    textTransform: "none",
                    "&:hover": {borderColor: buttonState.border, color: buttonState.font, cursor: buttonState.cursor},
                    margin: "5% 0% 0% 0%"
                }}
            >
                {buttonState.message}
            </Button>
        </Link>
    );
}

export default MintRedirectionButton;