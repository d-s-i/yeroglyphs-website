import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import WarningIcon from '@mui/icons-material/Warning';

export default function Leviathan() {
    
  return (
    <Container maxWidth="sm">
        <Container maxWidth="sm">
          <Typography component="p" variant="h4" sx={{ color: "red" }}>
            <WarningIcon />
            {`The enigma has been resolved, I let it here for history. The secret password already have been claimed by Xnake and can't be claimed again`}
          </Typography>
        </Container>
        <Typography component="p" variant="h6" color="primary" sx={{ marginTop: "15%" }}>{`In the Old Testament we read how Yahweh protected mortals from a terrible sea monster, Leviathan. It seems that Leviathan could once again come out of its lair and ravage the Egyptian shores. To avoid this catastrophe, Cleopatra gave you a stone engraved with the words of Yahweh himself about Leviathan: `}</Typography>
        <Typography component="p" variant="h6" color="primary" align="center" sx={{ marginTop: "5%" }}>&ldquo;His heart is as hot and hard as </Typography>
        <Typography component="p" variant="h6" color="primary" align="center">a stone left in the desert sun.</Typography>
        <Typography component="p" variant="h6" color="primary" align="center">He howls all day long, and the sailors hear his bitter fury </Typography>
        <Typography component="p" variant="h6" color="primary" align="center">thrown into the sea at nightfall. </Typography>
        <Typography component="p" variant="h6" color="primary" align="center">And on land, no one can be born </Typography>
        <Typography component="p" variant="h6" color="primary" align="center">to become its master.&rdquo;</Typography>
        <Typography component="p" variant="h6" color="primary" sx={{ marginTop: "5%" }}>Will you find a way to defeat the enigmatic Leviathan? Tell us your strategy in the Telegram.</Typography>
        <Typography component="p" variant="h6" color="primary" sx={{ marginTop: "10%" }}>Answer - Read one every two lines of the paragraph to see: A stone left in the desert sun, thrown into the sea at nightfall, to become its master.</Typography>
    </Container>
  );
}