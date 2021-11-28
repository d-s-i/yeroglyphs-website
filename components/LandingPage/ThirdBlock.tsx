import React from "react";
import Image from "next/image";

import styles from "./ThirdBlock.module.css";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import parchment from "../../public/parchment.png";
import ring from "../../public/ring.png";
import crook from "../../public/crook.png";

interface Props {
    isMintReleased: boolean;
}

function ThirdBlock(props: Props) {
    return(
        <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{paddingBottom: "3%", border: "1px red solid"}}
        >
            <Grid item sx={{paddingTop: "3%", paddingBottom: "1%", border: "1px green solid"}}>
                <Typography align="center" component="h2" color="primary" sx={{ fontWeight: "bold", fontSize: "5.5em", width: "100%" }}>
                    Why Is <span className="goldColor">Yero</span> So Special ?
                </Typography>
            </Grid>
            <Grid container sx={{border: "1px orange solid", backgroundColor: "#000000"}}>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    sx={{border: "1px white solid", padding: "3% 10% 0% 10%"}}
                >
                    <Grid container sx={{border: "1px orange solid"}}>
                        <Grid item xs={4} sx={{border: "1px red solid", display: "flex", flexDirection: "column", justifyContent: "center"}}>
                            <Image src={parchment} width="100" height="100" />
                            <Typography component="p" variant="subtitle1" color="primary">Test</Typography>
                        </Grid>
                        <Grid item xs={4} sx={{border: "1px red solid", display: "flex", flexDirection: "column", justifyContent: "center"}}>
                            <Image src={ring} width="100" height="100" />
                            <Typography component="p" variant="subtitle1" color="primary">Test</Typography>
                        </Grid>
                        <Grid item xs={4} sx={{border: "1px red solid", display: "flex", flexDirection: "column", justifyContent: "center"}}>
                            <Image src={crook} width="100" height="100" />
                            <Typography component="p" variant="subtitle1" color="primary">Test</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default ThirdBlock;