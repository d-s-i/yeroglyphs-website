import Image from "next/image";

import TextUnderlinedGold from '../TextUnderlinedGold';
import yeroPlanet from "../../../public/yeroPlanet.png";

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import styles from "./HotExperimentCard.module.css";

interface Props {
    index: number
    title: string;
    image: StaticImageData;
    firstParagraph: string;
    secondParagraph?: string;
    colorReversed: boolean;
}

function HotExperimentCard(props: Props) {

    const normalColors = {
        backgroundColor: "#000000",
        titleAddedColor: "#FFD700",
        mainColor: "#f3f4f6",
    };

    const reversedColors = {
        backgroundColor: "#FFD700",
        titleAddedColor: "#996633",
        mainColor: "#1a1a1a"
    }

    const colors = props.colorReversed ? reversedColors: normalColors;
    
    return(
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{
                backgroundColor: colors.backgroundColor,
                borderRadius: "1em",
                padding: "1% 2% 1% 3%",
                margin: "0% 5% 5% 5%",
                width: "90%"
            }}
        >
            <Grid item width={1} sx={{margin: "2% 0% 3% 0%"}}>
                <Typography component="p" variant="h4" align="left" sx={{fontWeight: "bold", color: colors.mainColor}} >
                    <span style={{textDecoration: "underline", color: colors.titleAddedColor}} >{`Hot NFT Experiment #${props.index}`}</span>
                    {` - ${props.title}`}
                </Typography>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={5} sx={{marginTop: "3%"}}>
                    <Grid 
                        container 
                        className="box bounce-2" 
                        sx={{display: "flex", justifyContent: "center"}}
                    >
                        <Image src={props.image} alt="" width="150" height="150" />
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={7} sx={{width: "100%"}}>
                    <Typography component="p" variant="subtitle1" align="left" sx={{ width: "100%", fontSize: "1.2em", color: colors.mainColor }}>
                        {props.firstParagraph}
                    </Typography>
                    {props.secondParagraph && <Typography component="p" variant="subtitle1" align="left" sx={{ width: "100%", marginTop: "5%", fontSize: "1.2em", color: colors.mainColor }}>
                        {props.secondParagraph}
                    </Typography>}
                </Grid>
                </Grid>
        </Grid>
    );
}

export default HotExperimentCard;