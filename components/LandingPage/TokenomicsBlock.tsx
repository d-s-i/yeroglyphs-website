import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import MintingButton from "../UI/Buttons/MintingButton";

import ListItemFeature from "../UI/ListItemFeature";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    backgroundColor: "transparent"
  }));


interface Props {
    isMintReleased: boolean;
}

const checkColor = "#248f24";

function TokenomicsBlock(props: Props) {
    return(
        <Container maxWidth="xl" sx={{display: "flex", flexDirection: "column", justifyContent: "center", padding: "5% 0% 3% 0%"}}>
            <Container maxWidth="lg" sx={{display: "flex", flexDirection: "column", justifyContent: "center"}} >
                <Container maxWidth="lg" sx={{ backgroundColor: "#FFD700", borderTopLeftRadius: "1em", borderTopRightRadius: "1em", padding: "1% 0% 1% 0%" }}>
                    <Typography component="p" variant="h2" align="center" sx={{ fontWeight: "bold" }}>Unique NFT Metadata Dynamics</Typography>
                </Container>
                <Container maxWidth="lg" sx={{ backgroundColor: "#000000", borderBottomLeftRadius: "1em", borderBottomRightRadius: "1em", padding: "1% 0% 1% 0%" }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Item>
                                    <Typography component="p" variant="h5" color="primary" sx={{ fontWeight: "bold" }}>
                                        Fair Launched - Zero Bots, Zero VC, Zero Cronies Advantage, Here For The Long-Term
                                    </Typography>
                                </Item>
                                <Item>
                                    <ListItemFeature bulletColor="#ff00ff" bullet="❌" textColor="#f3f4f6" text="No More Static JPEG" />
                                </Item>
                                <Item>
                                    <ListItemFeature bulletColor="#ff00ff" bullet="❌" textColor="#f3f4f6" text="No More Huge Gas Costs for On-Chain Art" />
                                </Item>
                                <Item>
                                    <ListItemFeature bulletColor="#ff00ff" bullet="❌" textColor="#f3f4f6" text="Real Valuable Timeless Piece of Art Only (No More Useless Profile Picture)" />
                                </Item>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Item>
                                    <Typography component="p" variant="h5" color="primary" sx={{ fontWeight: "bold" }}>
                                        Tokenomics serving the expriment
                                    </Typography>
                                </Item>
                                <Item>
                                    <ListItemFeature bulletColor={checkColor} bullet="✓" textColor="#f3f4f6" text="Extremely Low Supply - Only 512 Yero EVER" />
                                </Item>
                                <Item>
                                    <ListItemFeature bulletColor={checkColor} bullet="✓" textColor="#f3f4f6" text="Long-Term Building Blocks" />
                                </Item>
                                <Item>
                                    <ListItemFeature bulletColor={checkColor} bullet="✓" textColor="#f3f4f6" text="The State of Your NFT is Changing on EVERY Block (you can save it or disregard it forever)" />
                                </Item>
                                <Item>
                                    <ListItemFeature bulletColor={checkColor} bullet="✓" textColor="#f3f4f6" text="First On Chain Dynamic Metadata NFTs EVER" />
                                </Item>
                                <Item>
                                    <ListItemFeature bulletColor={checkColor} bullet="✓" textColor="#f3f4f6" text="Optimized Gas Cost Minting" />
                                </Item>
                                <Item>
                                    <ListItemFeature bulletColor={checkColor} bullet="✓" textColor="#f3f4f6" text="People resolving enigmas get rewarded with a highly scarce Genesis Yero" />
                                </Item>
                                <Item>
                                    <ListItemFeature bulletColor={checkColor} bullet="✓" textColor="#f3f4f6" text="Able to Bridge and Display Your NFT on Other Chains" />
                                </Item>
                                <Item>
                                    <ListItemFeature bulletColor={checkColor} bullet="✓" textColor="#f3f4f6" text="Exploring the Frontier To Create and Display NFTs" />
                                </Item>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Container>
            <Container maxWidth="xs" sx={{display: "flex", flexDirection: "column", justifyContent: "center", padding: "3% 0% 1% 0%"}}>
                <MintingButton isMintReleased={props.isMintReleased} />
            </Container>
        </Container>
    );
}

export default TokenomicsBlock;