import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

// const textPresentation = `
// We are Ex-entric, a small deviant group of elitist builders. 
// We operate on Web3, and most precisely in the NFT industry. 
// We plan to build in the nft art and the harsh and digitally violent nft gaming industry, and group those worlds together.
// Our strategies will be step by step and based on our long-term passion for gaming and art, as we combine our dedication, network and work ethic to create a powerful and dedicated community around our ethos. Ex-entric is now focused on art and firmly believe in the long term value of scarce digital assets. We understand that a high level of specialisation is required in order to thrive, and plan to evolve after each step. We will always seek to maximise value creation. 
// Yero is one of our innovations, and you are welcome to be an early supporter of Ex-entric. It was born after a breakthrough our team had, and without being technical, this will allow developers to make much crazier generative on chain artwork. This is our first innovation to the Web3 world, and we made a small collection to make it public and known to the public. The original Yero collection will have a max supply of 512 nfts. This will be a highly scarce item that will gain value and exposure much easier with this design.
// `;

// const lines = [
//     "We are Ex-entric, a small deviant group of elitist builders.",
//     "We operate on Web3, and most precisely in the NFT industry.",
//     "We plan to build in the nft art and the harsh and digitally violent nft gaming industry, and group those worlds together.",
//     "Our strategies will be step by step and based on our long-term passion for gaming and art, as we combine our dedication, network and work ethic to create a powerful and dedicated community around our ethos. Ex-entric is now focused on art and firmly believe in the long term value of scarce digital assets. We understand that a high level of specialisation is required in order to thrive, and plan to evolve after each step. We will always seek to maximise value creation.",
//     "Yero is one of our innovations, and you are welcome to be an early supporter of Ex-entric. It was born after a breakthrough our team had, and without being technical, this will allow developers to make much crazier generative on chain artwork. This is our first innovation to the Web3 world, and we made a small collection to make it public and known to the public. The original Yero collection will have a max supply of 512 nfts. This will be a highly scarce item that will gain value and exposure much easier with this design."
// ];

// const lines = [
//     "We are Ex-entric, a small deviant group of elitist builders.",
//     "We operate on Web3, and most precisely in the NFT industry.",
//     "Yero is one of our innovations, and you are welcome to be an early supporter of Ex-entric. It was born after a breakthrough we had, and without being technical, this will allow developers to make much crazier generative on chain artwork."
// ];

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