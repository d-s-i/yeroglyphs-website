import React from "react";

import Button from "@mui/material/Button";

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
}

function GoldButton(buttonProps: ButtonProps) {

    return(
            <Button 
            onClick={buttonProps.onClick}
                variant="contained" 
                sx={{
                    borderColor: "#FFD700", 
                    backgroundColor: " #FFD700", 
                    padding: "0% 5% 0% 5%",
                    fontSize: "1.5em",
                    textTransform: "none",
                    "&:hover": { cursor: "pointer", backgroundColor: "#ccad00" },
                    margin: "5% 0% 0% 0%"
                }}
            >
                {buttonProps.children}
            </Button>
    );
}

export default GoldButton;