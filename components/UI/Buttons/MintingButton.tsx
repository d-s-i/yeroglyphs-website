import React from "react";
import Link from "next/link";

import Button from "@mui/material/Button";

interface Props {
    isMintReleased: boolean;
}

function MintingButton(props: Props) {

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
        <Link href={props.isMintReleased ? "/mint" : "/"}>
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

export default MintingButton;


// import Stack from '@mui/material/Stack';
// import ButtonUnstyled, {
//   buttonUnstyledClasses,
//   ButtonUnstyledProps,
// } from '@mui/base/ButtonUnstyled';
// import { styled } from '@mui/system';

// interface Props {
//     isMintReleased: boolean;
// }

// const CustomButtonRoot = styled('button')`
//     border-olor: "#FFD700", 
//     color: " #FFD700", 
//     padding: "1% 5% 1% 5%",
//     fontSize: "2em",
//     transition: all 200ms ease;
//     cursor: pointer;

//     &:hover {
//         background-color: #0059b2;
//     }

//     &.${buttonUnstyledClasses.active} {
//         background-color: #004386;
//     }

//     &.${buttonUnstyledClasses.focusVisible} {
//         box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
//         outline: none;
//     }

//     &.${buttonUnstyledClasses.disabled} {
//         opacity: 0.5;
//         cursor: not-allowed;
//         box-shadow: 0 0 0 0 rgba(0, 127, 255, 0);
//     }
// `;

// function CustomButton(props: ButtonUnstyledProps) {
//   return <ButtonUnstyled {...props} component={CustomButtonRoot} />;
// }

// export default function MintingButon(props: Props) {
//   return (
//     <Stack spacing={2} direction="row">
//       <CustomButton disabled={!props.isMintReleased}>Disabled</CustomButton>
//     </Stack>
//   );
// }