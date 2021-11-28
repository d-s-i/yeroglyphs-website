import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ListItemFeature from "../UI/ListItemFeature";
import Paper from '@mui/material/Paper';
import Container from "@mui/material/Container";

import demoYero from "../../public/demo-yero.jpg";
import bobaPic from "../../public/boba.png";

import Image from "next/image";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

function FirstBlock() {
    return(
        <Box sx={{ flexGrow: 1 }}>
            <Grid container sx={{marginTop: "3%", marginBottom: "3%",  }}>
                <Grid item xs={7} sx={{marginTop: "3%"}} >
                    <Item sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
                    <Typography align="left" component="h1" variant="h2" color="primary" sx={{fontWeight: "bold"}} >
                        <span className="goldColor" >Yero</span> - NFTs Are Not Anymore What You Think It Is
                    </Typography>
                    <Typography align="left" component="h2" variant="h5" color="primary" sx={{paddingBottom: "5%", fontWeight: "bold"}}>
                        This New, Highly Experimental NFT Allow Its Holders To Create Magnificent Art On-Demand and Increase The Value Of Their NFT
                    </Typography>
                    <ListItemFeature text="Make Unique Art Via an On-Chain Algorithm"/>
                    <ListItemFeature text="Give Value To Your NFT By Creating New Randomized Art on Every Block "/>
                    <ListItemFeature text="Change Back and Forth Between Your Favorite Artwork And Create New Artwork"/>
                    <ListItemFeature text="Hot New NFT Experiment Unlike Other NFTs!"/>
                    <Typography align="left" component="p" variant= "h4" color="primary" sx={{marginTop: "5%"}}>
                        Contract Address: 
                    </Typography>
                    <Typography align="left" component="p" variant= "h4" color="primary" sx={{fontWeight: "bold"}}>
                        Will be revealed soon…
                    </Typography>
                    </Item>
                </Grid>
                <Grid item xs={5}>
                    <Item sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
                    <Grid 
                        container 
                        spacing={2} 
                        className="box bounce-2" 
                        sx={{marginTop: "3%", display: "flex", justifyContent: "center"}}
                    >
                        <Image src={demoYero} width="400" height="400" />
                    </Grid>
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Typography sx={{margin: "5% 0% 2% 0%", fontWeight: "bold"}} component="p" variant="h5" color="primary">
                                Mint Price: TBD...
                            </Typography>
                            <Typography sx={{margin: "2% 0% 2% 0%", fontWeight: "bold"}} component="p" variant="h5" color="primary">
                                Total Supply: 512...
                            </Typography>
                            <Button 
                                variant="outlined" 
                                sx={{
                                    borderColor: "#FFD700", 
                                    color: " #FFD700", 
                                    padding: "1% 5% 1% 5%",
                                    fontSize: "2em",
                                    textTransform: "none",
                                    "&:hover": {borderColor: "#fff099", color: "#fff099"},
                                    margin: "5% 0% 0% 0%"
                                }}
                            >
                                Minting Locked...
                            </Button>
                        </Grid>
                    </Item>
                </Grid>
            </Grid>
            <Container maxWidth="lg">
                <Typography align="center" component="p" variant="h2" color="primary" sx={{fontWeight: "bold", marginTop: "2%"}}>
                    Coming <span className="goldColor">Soon</span> On ...
                </Typography>
                <div style={{display: "flex", justifyContent: "center", marginTop: "3%"}}>
                    <Image src={bobaPic} width="200" height="120" />
                </div>
            </Container>
        </Box>
    );
}

export default FirstBlock;