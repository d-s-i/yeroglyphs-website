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
            <span>Join the <a href="https://t.me/yeroglyphs" style={{fontWeight: "bold"}} target="_blank" rel="noopener noreferrer">Telegram</a> and engage with your fellow historians</span>,
            <span>Follow us on <a href="https://twitter.com/yeroglyphs" style={{fontWeight: "bold"}} target="_blank" rel="noopener noreferrer" >Twitter</a>, many of the passwords will be hidden there</span>,
            <span>Check the history of the messages, rewteet, like and comment our tweets</span>,
            <span>Be curious, our founder is quite sadistic when it comes to hiding clues.</span>,
            <span>Try your luck to find a hidden password and use it to mint a Genesis Yero</span>
        ]
    }, {
        title: "Mint Your Own Yero NFT",
        bullets: [
            <span>Click on any button on this page to go on the minting page</span>,
            <span>Connect your wallet</span>,
            <span>Make sure there are still Yero available</span>,
            <span>Click “Mint”</span>,
            <span>Congrats! You you created unique art and started your journey in generative art</span>
        ]   
    }, {
        title: "Observe The Art Your Generated",
        bullets: [
            <span>Nft plateform are not ready yet on Boba, so we created ours !</span>,
            <span>Go to NOT_AVAILABLE_YET</span>,
            <span>Connect your Metamask</span>,
            <span>Admire the art you created!</span>
        ]
    }, {
        title: "Generate New Art On Your NFT",
        bullets: [
            <span>Side note : You always keep previously generated art stored in your NFT contract !</span>,
            <span>Go on NOT_AVAILABLE_YET</span>,
            <span>Vizualize the current state of your NFT (it changes on every block)</span>,
            <span>If you want to save this state, click the button !</span>,
            <span>As simple as this!</span>
        ]
    }, {
        title: "Save This Art As Default",
        bullets: [
            <span>If you want to put your newly generated art as default on your favorite plateform, you can!</span>,
            <span>Go on NOT_AVAILABLE_YET</span>,
            <span>Check all the artwork your created</span>,
            <span>Click 'Save' on the artwork you like</span>,
            <span>Congrats! You just changed the image of your NFT</span>
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