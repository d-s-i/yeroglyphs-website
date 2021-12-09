import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import WarningIcon from '@mui/icons-material/Warning';

export default function Enigma() {
    
  return (
    <Container maxWidth="sm">
        <Container maxWidth="sm">
          <Typography component="p" variant="h4" sx={{ color: "red", marginBottom: "10%" }}>
            <WarningIcon />
            The enigma has been resolved, I let it here for history. The secret password already have been claimed by @0xScissus and can't be claimed again
          </Typography>
        </Container>
        <Typography component="p" variant="h6" color="primary">A traveler is on her way to Assouan when she comes to a fork in the road. She is wondering which way to go when two men appear. One cannot tell the truth, and the other cannot tell a lie.  The traveler doesn’t know which is which. What one question can she ask which will show her the right road to Assouan?</Typography>
        <Typography component="p" variant="h6" color="primary" sx={{ marginTop: "5%" }}>In order to be fair and transparent for everyone, only answer on the telegram will be accepted! Answer here: t.me/yeroglyphs</Typography>
    </Container>
  );
}