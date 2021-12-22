import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import StepCard from "../UI/Cards/StepCard";
import MintRedirectionButton from "../UI/Buttons/MintRedirectionButton";
import egyptGifGif from "../../public/egyptGif.gif";

const steps = [
    {
        title: "Join the Community",
        bullets: [
            <span key="bullet-1" >Join the <a href="https://t.me/yeroglyphs" style={{fontWeight: "bold", color: "#ccad00"}} target="_blank" rel="noopener noreferrer">Telegram</a> and engage with your fellow historians</span>,
            <span key="bullet-2" >Follow us on <a href="https://twitter.com/yeroglyphs" style={{fontWeight: "bold", color: "#ccad00"}} target="_blank" rel="noopener noreferrer" >Twitter</a>, many of the passwords will be hidden there</span>,
            <span key="bullet-3" >Check the history of the messages, rewteet, like and comment our tweets</span>,
            <span key="bullet-4" >Be curious, our founder is quite sadistic when it comes to hiding clues.</span>,
            <span key="bullet-5" >Try your luck to find a hidden password and use it to mint a Genesis Yero</span>
        ]
    }, {
        title: "Mint Your Own Yero NFT",
        bullets: [
            <span key="bullet-6" >Click on any button on this page to go on the minting page</span>,
            <span key="bullet-7" >Connect your wallet</span>,
            <span key="bullet-8" >Make sure there are still Yero available</span>,
            <span key="bullet-9" >Click “Mint”</span>,
            <span key="bullet-10" >Congrats! You you created unique art and started your journey in generative art</span>
        ]   
    }, {
        title: "Observe The Art Your Generated",
        bullets: [
            <span key="bullet-11" >Nft platform are not ready yet on Boba, so we created ours !</span>,
            <span key="bullet-12" >Go to yero.website/mint</span>,
            <span key="bullet-13" >Connect your Metamask</span>,
            <span key="bullet-14" >Admire the art you created!</span>
        ]
    }, {
        title: "Generate New Art On Your NFT",
        bullets: [
            <span key="bullet-15" >Side note : You always keep previously generated art stored in your NFT contract !</span>,
            <span key="bullet-16" >Go on yero.website/generate</span>,
            <span key="bullet-17" >Vizualize the current state of your NFT (it changes on every block)</span>,
            <span key="bullet-18" >If you want to save this state, click the button !</span>,
            <span key="bullet-19" >As simple as this!</span>
        ]
    }, {
        title: "Save This Art As Default",
        bullets: [
            <span key="bullet-20" >If you want to put your newly generated art as default on your favorite plateform, you can!</span>,
            <span key="bullet-21" >Go on yero.website/save</span>,
            <span key="bullet-22" >Check all the artwork your created</span>,
            <span key="bullet-23" >{`Click 'Save' on the artwork you like`}</span>,
            <span key="bullet-24" >Congrats! You just changed the image of your NFT</span>
        ]
    }, 
    {
        title: "Show It Everywhere You Want",
        image: egyptGifGif,
        subtitle: "You generate the art, we generate the hype."
    }
]

function TutoBlock() {
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
                <MintRedirectionButton />
            </Container>
        </Container>
    );
}

export default TutoBlock;