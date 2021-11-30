import React from "react";
import Image from "next/image";

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import parchment from "../../public/parchment.png";
import ring from "../../public/ring.png";
import crook from "../../public/crook.png";
import ankh from "../../public/ankh.png";
import MintingButton from "../UI/Buttons/MintingButton";

interface Props {
    isMintReleased: boolean;
}

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: "transparent"
  }));

function ExplanationBlock(props: Props) {
    return(
        <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{paddingBottom: "3%"}}
        >
            <Grid item sx={{paddingTop: "3%", paddingBottom: "1%"}}>
                <Typography align="center" component="h2" color="primary" sx={{ fontWeight: "bold", fontSize: "5.5em", width: "100%" }}>
                    Why Is <span className="goldColor">Yero</span> So Special ?
                </Typography>
            </Grid>
            <Container maxWidth="lg" sx={{marginTop: "3%"}}>
                <Grid container sx={{backgroundColor: "#000000", borderRadius: "1em"}}>
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        sx={{padding: "3% 3% 3% 3%"}}
                    >
                        <Grid container sx={{ marginBottom: "5%" }}>
                            <Grid item xs={12} md={4} >
                                <Item sx={{ marginBottom: "5%" }}>
                                    <Image src={crook} alt="crook" width="80" height="80" />
                                </Item>
                                <Typography component="p" variant="h4" color="primary" sx={{fontWeight: "bold", color: "#FFD700", width: "100%", marginBottom: "5%"}} align="center">
                                    New Metadata Mechanism
                                </Typography>
                                <Typography component="p" variant="h6" color="primary" align="center">
                                    We are not a simple NFT. We come with an innovation allowing people to screenshot the blockchain and collect this artwork on their NFTs. This is unheard of.
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={4} >
                                <Item sx={{ marginBottom: "5%" }}>
                                    <Image src={parchment} alt="parchment" width="80" height="80" />
                                </Item>
                                <Typography component="p" variant="h4" color="primary" sx={{fontWeight: "bold", color: "#FFD700", width: "100%", marginBottom: "5%"}} align="center">
                                    Very Low Supply
                                </Typography>
                                <Typography component="p" variant="h6" color="primary" align="center">
                                    {`Only 512 will ever get created making its access very elitist knowing that it's not a simple JPEG NFT.`}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={4} >
                                <Item sx={{ marginBottom: "5%" }}>
                                    <Image src={ring} alt="ring" width="80" height="80" />
                                </Item>
                                <Typography component="p" variant="h4" color="primary" sx={{fontWeight: "bold", color: "#FFD700", width: "100%", marginBottom: "5%"}} align="center">
                                    {`Yero's Proof Of Work`}
                                </Typography>
                                <Typography component="p" variant="h6" color="primary" align="center">
                                    Anyone will be able to mint a Yero NFT. But proof of work is required in order to mint a rare one, aka. Genesis Yero.
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid 
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Item sx={{width: "100%", marginBottom: "3%"}}>
                                <Image src={ankh} alt="ankh" width="80" height="80" />
                            </Item>
                            <Typography component="p" variant="h4" color="primary" sx={{fontWeight: "bold", color: "#FFD700", width: "100%", marginBottom: "3%"}} align="center">
                                Get a chance to mint a Genesis Yero!
                            </Typography>
                            <Typography component="p" variant="h6" color="primary" align="center" sx={{ marginBottom: "3%" }}>
                                Follow us on <a href="https://twitter.com/yeroglyphs" target="_blank" rel="noopener noreferrer">Twitter</a>, decode the passwords (they will be in the form of words, hidden anywhere), and use those word to mint your Yero NFT!
                            </Typography>
                            <Typography component="p" variant="h6" color="primary" align="center" sx={{ marginBottom: "3%" }}>
                                You should also join our <a href="https://t/me/yeroglyphs" target="_blank" rel="noopener noreferrer">Telegram</a> to discuss with the community.
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <Container maxWidth="xs" sx={{display: "flex", flexDirection: "column", justifyContent: "center", padding: "0% 0% 3% 0%"}}>
                <MintingButton isMintReleased={props.isMintReleased} />
            </Container>
        </Grid>
    );
}

export default ExplanationBlock;