import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function Enigma() {
    
  return (
    <Container maxWidth="sm">
        <Typography component="p" variant="h6" color="primary">A traveler is on her way to Assouan when she comes to a fork in the road. She is wondering which way to go when two men appear. One cannot tell the truth, and the other cannot tell a lie.  The traveler doesn’t know which is which. What one question can she ask which will show her the right road to Assouan?</Typography>
        <Typography component="p" variant="h6" color="primary" sx={{ marginTop: "5%" }}>In order to be fair and transparent for everyone, only answer on the telegram will be accepted! Answer here: t.me/yeroglyphs</Typography>
    </Container>
  );
}