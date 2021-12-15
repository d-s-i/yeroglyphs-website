import InformationParagraph from "./InformationParagraph";
import MintTable from "./MintTable";

import { Typography } from "@mui/material";
import Container from "@mui/material/Container";

import styles from "./MintInfos.module.css";
import { goldColor } from "../../helpers/constant";

const projectSentences = [
    <span key="sent-1">Yero is the first collection of its kind and innovate by giving the ability to create, save, and change the art on its nft, ON CHAIN</span>,
    <span key="sent-2">We are an innovative nft project on Boba Network. Our idea is similar to our brother Autoglyphs on Ethereum, except that we allow more fancy features on our NFTs.</span>,
    <span key="sent-3">We allow our nft holders to keep creating art without diluting the supply of Yero. It will always stay at 512 nft EVER. With our amazing partnership, we are at the right place at the right moment to become one of the OG nft collection of Boba Network.</span>,
    <span key="sent-4">Once the collection is fully minted, only nft holders will benefit from the "art creation". If you look at the autoglyphs collection on ethereum (<a style={{ color: goldColor, fontWeight: "bold" }} href="https://opensea.io/collection/autoglyphs" target="_blank" rel="noopener">see here</a>), the nfts have a ridiculous price. First, because it is an OG project, second, because they have an innovative art algorithm. But once they have been minted, they are fully static.</span>,
];

const seedSentences = [
    <span key="sent-5">The Seed is a number that defines the art on your nft. You can chose it or take a random one</span>,
    <span key="sent-6">Here is where the magic happens. You can see two inputs: "Seed" and "Password". The Seed is and number (between 0 and 5.7896045e+76) which will define your nft. It influences the art that it will contain for ever.</span>,
    <span key="sent-7">There are many different seeds (almost an infinity), but there is no real way to predict the effect of a given seed. So you can either enter a number you like, or let the chance create your art by Generating a Random Seed. From there, you will be able to mint your Yero nft.</span>
];

const passwordSentences = [
    <span key="sent-8">Passwords are not required to mint and can be left empty. They will give you a Genesis Yero if right</span>,
    <span key="sent-9">The Yero collection has 50 nfts that are called Genesis and have a "perfect" design. To mint a Genesis Yero, you need a password. Passwords have been given pre-mint and are not available anymore. If you have one, enter it in the "Password" input as it was given to you. Without any space before or after. Passwords are for single use, so I hope you didn't share them with anyone.</span>
];

const cyberDaoSentences = [
    <span key="sent-10">We also partnered with cyberDAO and Yero nfts will have special uses in this ecosystem!</span>
];

const pricesSentences = [
    <span key="sent-11">The main price is at 0.1010101 ether, with a big discount for the first ones, and a higher price for the last ones</span>,
    <span key="sent-12">Price will vary during the minting. Yero is a highly scarce NFT collection. Only 512 Yero will be minted ever. Here is how it will be distributed: </span>,
    <Container maxWidth="xs" key="sent-13"><MintTable /></Container>,
    <span key="sent-14">Why 0.1010101 ether for the main price ? Ask cyberDAO ...</span>
];

function MintInfos() {
    return(
        <Container maxWidth="md" sx={{ paddingBottom: "5%" }}>
            <Typography component="h3" variant="h2" color="primary" align="center" sx={{ paddingTop: "5%" }}>
                Welcome Adventurer
            </Typography>
            <Typography component="p" variant="h6" color="primary" sx={{ paddingTop: "10%" }}>
                You arrived on the Yero minting page. Congrats!
            </Typography>
            <Typography component="p" variant="h6" color="primary">
                Read the informations below if you want more informations about the Yero mint.
            </Typography>
            <InformationParagraph title="The Project" mainSentence={projectSentences[0]} details={projectSentences.slice(1)}/>
            <InformationParagraph title="Seed" mainSentence={seedSentences[0]} details={seedSentences.slice(1)}/>
            <InformationParagraph title="Password" mainSentence={passwordSentences[0]} details={passwordSentences.slice(1)}/>
            <InformationParagraph title="CyberDAO <> Yero" mainSentence={cyberDaoSentences[0]} details={cyberDaoSentences.slice(1)}/>
            <InformationParagraph title="Price" mainSentence={pricesSentences[0]} details={pricesSentences.slice(1)}/>
        </Container>
    );
}

export default MintInfos;