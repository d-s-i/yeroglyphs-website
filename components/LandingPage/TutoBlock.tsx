import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import StepCard from "../UI/Cards/StepCard";
import MintingButton from "../UI/Buttons/MintingButton";
import egyptGifGif from "../../public/egyptGif.gif";

interface Props {
    isMintReleased: boolean;
}

const steps = [
    {
        title: "Join the Community",
        bullets: [
            "Click on this link t.me/yeroglyphs and engage with your fellow historians",
            "Follow us on twitter, many of the passwords will be hidden there https://twitter.com/yegorlyphs",
            "Check the history of the messages, rewteet, like and comment our tweets",
            "Be curious, our founder is quite sadistic when it comes to hiding clues.",
            "Try your luck to find a hidden password and use it to mint a Genesis Yero"
        ]
    }, {
        title: "Mint Your Own Yero NFT",
        bullets: [
            "Click on any button on this page to go on the minting page",
            "Connect your wallet",
            "Make sure there are still Yero available",
            "Click “Mint”",
            "Congrats! You you created unique art and started your journey in generative art"
        ]   
    }, {
        title: "Observe The Art Your Generated",
        bullets: [
            "Nft plateform are not ready yet on Boba, so we created ours !",
            "Go to yero.com/nfts",
            "Connect your Metamask",
            "Admire the art you created !"
        ]
    }, {
        title: "Generate New Art On Your NFT",
        bullets: [
            "Side note : You always keep previously generated art stored in your NFT contract !",
            "Go on yero.com/generate",
            "Vizualize the current state of your NFT (it changes on every block)",
            "If you want to save this state, click the button !",
            "As simple as this!"
        ]
    }, {
        title: "Save This Art As Default",
        bullets: [
            "If you want to put your newly generated art as default on your favorite plateform, you can!",
            "Go on the etherscan of the Yero NFT",
            "Click “Contract” then “Write Contract”",
            "Enter your tokenId and the index of the art you want to save in the `setTokenIdDefaultIndex` function (index start from 0)",
            "Click “Write” and confirm the transaction in metamask",
            "Congrats! You just changed the state of your NFT"
        ]
    }, 
    {
        title: "Show It Everywhere You Want",
        image: egyptGifGif,
        subtitle: "You generate the art, we generate the hype."
    }
]

function TutoBlock(props: Props) {
    return(
        <Container maxWidth="lg" sx={{ padding: "5% 0% 5% 0%" }} >
            <Typography variant="h2" component="p" color="primary" align="center" sx={{ fontWeight: "bold" }}>
                How To Use Yero To Its Full Potential
            </Typography>
            <Typography variant="h4" component="p" color="primary" className="goldColor" sx={{ fontWeight: "bold" }}>
                It is one innovative experience among so many others, we will keep launching new ones along the way
            </Typography>
            {steps.map(step => {
                const index = steps.indexOf(step);
                if(!step.image) {
                    return(<StepCard key={index} title={step.title} bullets={step.bullets} index={steps.indexOf(step)} />);
                } else {
                    return(<StepCard key={index} title={step.title} image={step.image} subtitle={step.subtitle} index={steps.indexOf(step)} />);
                }
            })}
            <Container maxWidth="xs" sx={{display: "flex", flexDirection: "column", justifyContent: "center", padding: "3% 0% 1% 0%"}}>
                <MintingButton isMintReleased={props.isMintReleased} />
            </Container>
        </Container>
    );
}

export default TutoBlock;