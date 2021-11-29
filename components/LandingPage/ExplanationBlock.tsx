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
import CodeCard from "../UI/Cards/CodeCard";
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
                                    <Image src={parchment} alt="parchment" width="80" height="80" />
                                </Item>
                                <Typography component="p" variant="h4" color="primary" sx={{fontWeight: "bold", color: "#FFD700", width: "100%", marginBottom: "5%"}} align="center">
                                    On-Chain Algorithm
                                </Typography>
                                <Typography component="p" variant="h6" color="primary" align="center">
                                    {`Smart contracts are immutable and can't change once published. Our smart contracts contain the generative algorithm for ever.`}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={4} >
                                <Item sx={{ marginBottom: "5%" }}>
                                    <Image src={ring} alt="ring" width="80" height="80" />
                                </Item>
                                <Typography component="p" variant="h4" color="primary" sx={{fontWeight: "bold", color: "#FFD700", width: "100%", marginBottom: "5%"}} align="center">
                                    On-Chain Metadata
                                </Typography>
                                <Typography component="p" variant="h6" color="primary" align="center">
                                    Same logic for the Art. The art is contained in your copy of the smart contract and will be stored as long as Ethereum run, guaranteeing ownership for ever.
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={4} >
                                <Item sx={{ marginBottom: "5%" }}>
                                    <Image src={crook} alt="crook" width="80" height="80" />
                                </Item>
                                <Typography component="p" variant="h4" color="primary" sx={{fontWeight: "bold", color: "#FFD700", width: "100%", marginBottom: "5%"}} align="center">
                                    Dynamic Artwork
                                </Typography>
                                <Typography component="p" variant="h6" color="primary" align="center">
                                    Unlike other NFTs, owning a Yero allow you to generate art on demand by using our algorithm and store as many art as  you want in your NFT. 
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Item sx={{width: "100%", marginBottom: "3%"}}>
                                <Image src={ankh} alt="ankh" width="80" height="80" />
                            </Item>
                            <Typography component="p" variant="h4" color="primary" sx={{fontWeight: "bold", color: "#FFD700", width: "100%", marginBottom: "3%"}} align="center">
                                Generate Your Own Yero Now
                            </Typography>
                            <Typography component="p" variant="h6" color="primary" align="center" sx={{ marginBottom: "3%" }}>
                                {`Here is the actual code that will generate the art, but the magic is that you don't have to understand it to create your NFT ! This algorithm generates a sequence of characters, then interpreted to recreate a complex artistic piece, using a seed (determined in printing) and a dynamic pseudo-random variable. That's why anyone can create and recreate complex artistic pieces with Yero.`}
                            </Typography>
                            <CodeCard />
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