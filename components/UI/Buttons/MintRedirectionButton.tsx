import React from "react";
import Link from "next/link";

import Button from "@mui/material/Button";

function MintRedirectionButton() {

    return(
        <Link href="/mint" passHref>
            <Button 
                variant="outlined" 
                sx={{
                    borderColor: "#FFD700", 
                    color: " #FFD700", 
                    padding: "0% 5% 0% 5%",
                    fontSize: "2em",
                    textTransform: "none",
                    "&:hover": { borderColor: "#fff099", color: "#fff099", cursor: "pointer" },
                    margin: "5% 0% 0% 0%"
                }}
            >
                Mint Now!
            </Button>
        </Link>
    );
}

export default MintRedirectionButton;