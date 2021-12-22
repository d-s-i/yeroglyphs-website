import React from "react";
import Image from "next/image";

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import BackgroundColor from "../../UI/Cards/BackgroundColor";
import { styled } from '@mui/material/styles';

import telegramPic from "../../../public/telegram.png"
import twitterPic from "../../../public/twitter.png"

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  backgroundColor: "transparent"
}));

function Footer() {
    return(
        <BackgroundColor light={false}>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item sx={{ width: "100%", display: "flex", justifyContent: "center", flexDirection: "column" }}>
                    <Typography align="center" variant="h2" component="div" sx={{ flexGrow: 1, color: "#FFD700", marginTop: "2%", marginBottom: "2%" }} className="noselect">
                        𓁋 Yero
                    </Typography>
                    <Typography align="center" variant="h6" component="p" className="goldColor">
                        Follow us on Twitter and join our Telegram :
                    </Typography>
                </Grid>
                <Grid item sx={{ marginTop: "1%", display: "flex", justifyContent: "center" }}>
                    <Grid container spacing={2} sx={{ display: "flex", justifyContent: "center" }} >
                        <Grid item xs={5} sx={{ display: "flex" }}>
                            <Item sx={{boxShadow: "none"}}>
                                <Grid 
                                    container 
                                    spacing={2} 
                                    className="box bounce-2"
                                    direction="column" justifyContent="center"
                                    sx={{ marginTop: "3%" }}
                                >
                                    <a href="https://t.me/yeroglyphs" target="_blank" rel="noopener noreferrer">
                                        <Image src={telegramPic} alt="telegram-icon" width="75" height="75" />
                                    </a>
                                </Grid>
                            </Item>
                        </Grid>
                        <Grid item xs={5} sx={{ display: "flex" }}>
                            <Item sx={{ boxShadow: "none" }}>
                                <Grid 
                                    container 
                                    spacing={2} 
                                    className="box bounce-2"
                                    sx={{ marginTop: "3%" }}
                                >
                                    <a href="https://twitter.com/yeroglyphs" target="_blank" rel="noopener noreferrer">
                                        <Image src={twitterPic} alt="twitter-icon" width="75" height="75" />
                                    </a>
                                </Grid>
                            </Item>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item >
                    <Typography component="p" variant="subtitle1" color="primary" align="center">Do Your Own Research.</Typography>
                    <Typography component="p" variant="subtitle1" color="primary" align="center">Not Financial Advice.</Typography>
                    <Typography component="p" variant="subtitle1" color="primary" align="center">Contracts are not audited, use at your own risks .</Typography>
                </Grid>
            </Grid>
        </BackgroundColor>
    );
}

export default Footer;