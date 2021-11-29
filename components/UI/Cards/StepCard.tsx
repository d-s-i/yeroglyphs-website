import React from "react";
import Image from "next/image";

import Grid from '@mui/material/Grid';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import ListItemFeature from "../ListItemFeature";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(3),
    color: theme.palette.text.secondary,
    backgroundColor: "#ffffff",
    borderRadius: "1em",
}));

interface Props {
    index: number;
    title: string;
    bullets?: string[];
    image?: StaticImageData;
    subtitle?: string;
}

function StepCard(props: Props) {
    return(
        <Container maxWidth="md" sx={{ marginTop: "5%" }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Item>
                        <Typography component="p" variant="h3" sx={{ color: "#ccad00", marginBottom: "3%", fontWeight: "bold" }} >&#9656;{`Step #${props.index} - ${props.title}`}</Typography>
                        {props.bullets && props.bullets.map(bullet => {
                            return(
                                <Container maxWidth="md" sx={{ marginLeft: "5%" }} key={bullet}>
                                    <ListItemFeature 
                                        key={props.bullets!.indexOf(bullet)} 
                                        bulletColor="#000000" 
                                        bullet="•" 
                                        textColor="#000000" 
                                        text={bullet} 
                                    />
                                </Container>
                            );
                        })}
                        {props.image && (<Container maxWidth="md" sx={{ display: "flex", justifyContent: "center" }}><Image alt="egyptian-gif" src={props.image.src} width="500" height="300"/></Container>)}
                        {props.subtitle && <Typography component="p" variant="h6" sx={{ marginTop: "3%", color: "#000000" }}  >{props.subtitle}</Typography>}
                    </Item>
                </Grid>
            </Grid>
        </Container>
    );
}

export default StepCard;