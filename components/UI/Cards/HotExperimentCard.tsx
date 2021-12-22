import Image from "next/image";

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

interface Props {
    index: number
    title: string;
    image: StaticImageData;
    paragraphs: string[];
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
                padding: "1% 2% 3% 3%",
                margin: "0% 5% 5% 5%",
                width: "90%"
            }}
        >
            <Grid item width={1} sx={{ margin: "2% 0% 3% 0%" }}>
                <Typography component="p" variant="h4" align="left" sx={{ fontWeight: "bold", color: "#f3f4f6" }} >
                    <span style={{ textDecoration: "underline", color: "#FFD700" }} >{`Hot NFT Experiment #${props.index}`}</span>
                    {` - ${props.title}`}
                </Typography>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={5} sx={{ marginTop: "3%" }}>
                    <Grid 
                        container 
                        className="box bounce-2" 
                        sx={{ display: "flex", justifyContent: "center" }}
                    >
                        <Image src={props.image} alt="" width="150" height="150" />
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={7} sx={{ width: "100%" }}>
                    {props.paragraphs?.map((paragraph, key) => {
                        return(
                            <Typography 
                                key={key} 
                                component="p" 
                                variant="subtitle1"
                                align="left" 
                                sx={{ width: "100%", fontSize: "1.2em", color: "#f3f4f6", marginTop: "5%" }}
                            >
                                {paragraph}
                            </Typography>
                        );
                    })}
                </Grid>
                </Grid>
        </Grid>
    );
}

export default HotExperimentCard;