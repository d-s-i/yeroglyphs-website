import Image from "next/image";

import { ethers } from "ethers";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ListItemFeature from "../UI/ListItemFeature";
import Paper from '@mui/material/Paper';
import Container from "@mui/material/Container";

import MintRedirectionButton from "../UI/Buttons/MintRedirectionButton";
import bobaPic from "../../public/boba.png";
import cyberDAOLogo from "../../public/cyberDAOLogo.svg";
import hiddenGenesis from "../../public/Genesis.png";

interface Props {
    isMintReleased: boolean;
}

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

function HookBlock(props: Props) {
    return(
        <Box sx={{ flexGrow: 1 }}>
            <Grid container sx={{ paddingTop: "3%", marginBottom: "3%" }}>
                <Grid item xs={12} xl={7} lg={7} sm={12} md={7} sx={{marginTop: "3%"}} >
                    <Item sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
                    <Typography align="left" component="h1" variant="h2" color="primary" sx={{fontWeight: "bold"}} >
                        <span className="goldColor" >Yero</span> - NFTs Are Not What You Think It Is
                    </Typography>
                    <Typography align="left" component="h2" variant="h5" color="primary" sx={{paddingBottom: "5%", fontWeight: "bold"}}>
                        This New, Highly Experimental NFT Allow Its Holders To Create Magnificent Art On-Demand and Increase The Value Of Their NFT
                    </Typography>
                    <ListItemFeature bullet="Ᵹ" bulletColor="#FFD700" textColor="#f3f4f6" text="Make Unique Art Via an On-Chain Algorithm"/>
                    <ListItemFeature bullet="Ᵹ" bulletColor="#FFD700" textColor="#f3f4f6" text="Give Value To Your NFT By Creating New Randomized Art on Every Block "/>
                    <ListItemFeature bullet="Ᵹ" bulletColor="#FFD700" textColor="#f3f4f6" text="Change Back and Forth Between Your Favorite Artwork And Create New Artwork"/>
                    <ListItemFeature bullet="Ᵹ" bulletColor="#FFD700" textColor="#f3f4f6" text="Resolve the enigma and get one of the 50 Genesis NFT"/>
                    <Typography align="left" component="p" variant= "h4" color="primary" sx={{marginTop: "5%"}}>
                        Contract Address: 
                    </Typography>
                    <Typography align="left" component="p" variant= "h4" color="primary" sx={{fontWeight: "bold"}}>
                        Will be revealed soon…
                    </Typography>
                    </Item>
                </Grid>
                <Grid item xs={12} xl={5} lg={5} sm={12} md={5} >
                    <Item sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
                        <Grid 
                            container 
                            spacing={2} 
                            className="box bounce-2" 
                            sx={{marginTop: "3%", display: "flex", justifyContent: "center"}}
                        >
                            <Image src={hiddenGenesis} alt="generative-art" width="400" height="400" />
                        </Grid>
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Typography sx={{margin: "5% 0% 2% 0%", fontWeight: "bold"}} component="p" variant="h5" color="primary">
                                {`Mint Price: ${ethers.utils.formatEther("101010100000000000")} Ξ...`}
                            </Typography>
                            <Typography sx={{margin: "2% 0% 2% 0%", fontWeight: "bold"}} component="p" variant="h5" color="primary">
                                Total Supply: 512...
                            </Typography>
                            <MintRedirectionButton isMintReleased={props.isMintReleased} />
                        </Grid>
                    </Item>
                </Grid>
            </Grid>
            <Container maxWidth="lg">
                <Grid container>
                    <Grid item sm={12} md={6}>
                    <Typography align="center" component="p" variant="h2" color="primary" sx={{fontWeight: "bold", marginTop: "2%"}}>
                            <span className="goldColor">Integrated</span> with ...
                        </Typography>
                        <div style={{ display: "flex", justifyContent: "center", marginTop: "3%" }}>
                            <Image src={cyberDAOLogo} alt="boba-network" width="200" height="120" />
                        </div>
                    </Grid>
                    <Grid item sm={12} md={6}>
                        <Typography align="center" component="p" variant="h2" color="primary" sx={{fontWeight: "bold", marginTop: "2%"}}>
                            Coming <span className="goldColor">Soon</span> On ...
                        </Typography>
                        <div style={{display: "flex", justifyContent: "center", marginTop: "3%" }}>
                            <Image src={bobaPic} alt="boba-network" width="180" height="100" />
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default HookBlock;