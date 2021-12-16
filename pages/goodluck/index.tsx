import React from "react";
import Image from "next/image";
import diamond from "../../public/diamond.png";
import diamondsolved from "../../public/diamondsolved.png";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { goldColor } from "../../helpers/constant";
import WarningIcon from '@mui/icons-material/Warning';
import CustomizedAccordions from "../../components/UI/CollapseGroupItem";


export default function Leviathan() {
    
  return (
    <Container maxWidth="sm" sx={{ display: "flex", flexDirection: "column" }}>
        <Container maxWidth="sm">
          <Typography component="p" variant="h4" sx={{ color: "red" }}>
            <WarningIcon />
            {`The enigma has been solved, I let it here for history. The secret passwords already have been claimed by @Nyrkkes, @DarkCenobyte, @Nobleauch and @AldusLarry and can't be claimed again`}
          </Typography>
        </Container>
        <Typography component="p" variant="h6" color="primary" sx={{ marginTop: "15%" }}>{`The circles of this diamond must contain the numbers from 1 to 14, so that the difference between two numbers connected by a segment, taken as an absolute value: `}</Typography>
        <Typography component="p" variant="h6" color="primary">1. is always a number less than or equal to 5</Typography>
        <Typography component="p" variant="h6" color="primary" sx={{ marginBottom: "5%" }}>2. is never equal to 3</Typography>
        <Image src={diamond} width="400" height="600" alt="enigma-image" />
        {/* <Typography component="p" variant="h6" color="primary" sx={{ marginTop: "5%", marginBottom: "10%" }}>Tell us which and and the general steps to draw it/them</Typography> */}
        <Typography component="p" variant="h6" color="primary" sx={{ marginTop: "5%" }}>
          There are 4 possibles answers! Each one will lead to a secret password, and tough, a Genesis Yero ... Good luck.
        </Typography>
        <Typography component="p" variant="h6" color="primary" sx={{ marginTop: "5%", marginBottom: "5%" }}>
          <span>We are waiting for your answer in the <a href="https://t.me/yeroglyphs" target="_blank" rel="noreferrer" style={{ color: goldColor }}>Telegram channel</a>!</span>
        </Typography>
        <CustomizedAccordions main={<span>Click to see the answer</span>} details={[<Image key="enigma-19" src={diamondsolved} fill/>]}/>
    </Container>
  );
}