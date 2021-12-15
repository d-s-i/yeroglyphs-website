import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

function GroupPresentatinBlock() {
    return(
        <Container maxWidth="lg" sx={{ paddingBottom: "3%" }}>
            <Typography align="center" component="h2" color="primary" sx={{ fontWeight: "bold", fontSize: "5.5em", width: "100%" }}>
                Who Are <span className="goldColor">We</span> ?
            </Typography>
            <Container maxWidth="lg">
            <Typography color="primary" component="p" variant="h6">We are Ex-entric, a small deviant group of elitist builders.</Typography>
            <Typography color="primary" component="p" variant="h6">We operate on Web3, and most precisely in the NFT industry.</Typography>
            <Typography color="primary" component="p" variant="h6" sx={{ marginTop: "2%" }}>Yero is one of our innovations, and you are welcome to be an early supporter of Ex-entric. It was born after a breakthrough we had, and without being technical, this will allow developers to make much crazier generative on chain artwork.</Typography>
            </Container>
        </Container>
    );
}

export default GroupPresentatinBlock;