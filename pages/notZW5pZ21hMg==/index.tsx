import React from "react";
import Image from "next/image";
import drawEnigma from "../../public/drawEnigma.png";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { goldColor } from "../../helpers/constant";
// import WarningIcon from '@mui/icons-material/Warning';

export default function Leviathan() {
    
  return (
    <Container maxWidth="sm" sx={{ display: "flex", flexDirection: "column" }}>
        {/* <Container maxWidth="sm">
          <Typography component="p" variant="h4" sx={{ color: "red" }}>
            <WarningIcon />
            {`The enigma has been resolved, I let it here for history. The secret password already have been claimed by Xnake and can't be claimed again`}
          </Typography>
        </Container> */}
        <Typography component="p" variant="h6" color="primary" sx={{ marginTop: "15%" }}>{`Among the following four drawings, which one(s) can you draw without lifting the pen (pencil) and without going over the same line more than once (but being able to go over the same intersection several times)?`}</Typography>
        <Typography component="p" variant="h6" color="primary" sx={{ marginTop: "5%", marginBottom: "10%" }}>Tell us which and and the general steps to draw it/them</Typography>
        <Image src={drawEnigma} width="400" height="450" alt="enigma-image" />
        <Typography component="p" variant="h6" color="primary" sx={{ marginTop: "5%" }}><span>We are waiting for your answer in the <a href="https://t.me/yeroglyphs" target="_blank" rel="noopener" style={{ color: goldColor }}>Telegram channel</a>!</span></Typography>
    </Container>
  );
}