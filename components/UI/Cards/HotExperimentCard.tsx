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
}

function HotExperimentCard(props: Props) {
    return(
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{
                backgroundColor: "#000000",
                borderRadius: "1em",
                padding: "1% 2% 1% 3%",
                margin: "3% 5% 3% 5%",
                width: "90%"
            }}
        >
            <Grid item width={1} sx={{margin: "2% 0% 3% 0%"}}>
                <Typography component="p" variant="h4" color="primary" align="left" sx={{fontWeight: "bold"}} >
                    <TextUnderlinedGold>{`Hot NFT Experiment #${props.index}`}</TextUnderlinedGold>
                    {`- ${props.title}`}
                </Typography>
            </Grid>
            <Grid item spacing={2} >
                <Grid container spacing={2}>
                    <Grid item xs={5} sx={{marginTop: "3%"}}>
                        <Grid 
                            container 
                            className="box bounce-2" 
                            sx={{display: "flex", justifyContent: "center"}}
                        >
                            <Image src={props.image} width="150" height="150" />
                        </Grid>
                    </Grid>
                    <Grid item xs={7} sx={{width: "100%"}}>
                        <Typography component="p" variant="subtitle1" color="primary" align="left" sx={{width: "100%", fontSize: "1.2em"}}>
                            {props.firstParagraph}
                        </Typography>
                        {props.secondParagraph && <Typography component="p" variant="subtitle1" color="primary" align="left" sx={{ width: "100%", marginTop: "5%", fontSize: "1.2em"}}>
                            {props.secondParagraph}
                        </Typography>}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default HotExperimentCard;