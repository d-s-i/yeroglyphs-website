import React from "react";

import Button from "@mui/material/Button";
import { goldColor } from "../../../helpers/constant";

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
}

function GoldButtonOutlined(buttonProps: ButtonProps) {

    return(
            <Button 
                onClick={buttonProps.onClick}
                variant="outlined" 
                size="small"
                sx={{
                    borderColor: goldColor, 
                    color: goldColor,
                    textTransform: "none",
                    "&:hover": { cursor: "pointer", borderColor: goldColor, backgroundColor: "rgb(255, 215, 0, 0.1)" },
                }}
            >
                {buttonProps.children}
            </Button>
    );
}

export default GoldButtonOutlined;