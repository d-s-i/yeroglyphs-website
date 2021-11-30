import HotExperimentCard from "../UI/Cards/HotExperimentCard";
import MintingButton from "../UI/Buttons/MintingButton";
import raEye from "../../public/ra-eye.png";
import pharaoh from "../../public/pharaoh2.png";
import scarab from "../../public/scarab.png";

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

interface Props {
    isMintReleased: boolean;
}

const experiments = [
    {
        title: "Generative Art",
        imageSrc: raEye,
        paragraphs: [
            "Generative art refers to any art made by an autonomous system. In our case, it is made by a cooperation between you AND an autonomous system: the blockchain.",
        ],
    }, {
        title: "Dynamic Metadata",
        imageSrc: scarab,
        paragraphs: [
            "You NFT is dynamic and its art can change on every block. You will be able to collect many artwork from your NFT, navigate through them, and display your favorite to the world."
        ],
    }, {
        title: "Only 50 Genesis NFTs",
        imageSrc: pharaoh,
        paragraphs: [
            `Each pieces is though unique, but all are Yero NFTs not equal. There is 50 NFTs out of 512 that are called 'Pure' and represent perfect pieces of art. Everyone will have a chance to get a Genesis Yero at some point, follow us on Twitter to know how 👀`,
        ],
    }

];

function ExperimentBlock(props: Props) {
    return(
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{paddingBottom: "3%"}}
        >
            <Grid item sx={{paddingTop: "3%", paddingBottom: "3%"}}>
                <Typography align="center" component="h2" color="primary" sx={{ fontWeight: "bold", fontSize: "5.5em", width: "100%" }}>
                    What is <span className="goldColor">Yero</span> ?
                </Typography>
            </Grid>
            <Grid item sx={{ width: "100%" }}>
                <Container maxWidth="md">
                    {experiments.map(experiment => {
                        const index = experiments.indexOf(experiment);
                        // const isColorReversed = index === (experiments.length - 1);
                        const isColorReversed = false;
                        return(
                            <HotExperimentCard 
                                title={experiment.title} 
                                key={index}
                                index={index + 1} 
                                image={experiment.imageSrc} 
                                paragraphs={experiment.paragraphs} 
                                colorReversed={isColorReversed}
                            />
                        );
                    })}
                </Container>
            </Grid>
            <MintingButton isMintReleased={props.isMintReleased} />
        </Grid>
    );
}

export default ExperimentBlock;