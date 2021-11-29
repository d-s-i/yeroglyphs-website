import HotExperimentCard from "../UI/Cards/HotExperimentCard";
import MintingButton from "../UI/Buttons/MintingButton";
import sarco from "../../public/sarco.png";
import pharaoh from "../../public/pharaoh.png";
import cat from "../../public/cat.png";

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

interface Props {
    isMintReleased: boolean;
}

const experiments = [
    {
        title: "Fully On Chain Art",
        imageSrc: sarco,
        paragraphs: [
            "People get excited with new NFTs. We made this to try something new and see how it goes. We will keep exploring the space and build upon it.",
            "If you are here for the art, you are at the right place. This is a new mechanism that that will probably generate some excitement about generative art."
        ],
    }, {
        title: "User is the Main Actor",
        imageSrc: pharaoh,
        paragraphs: [
            "The Core Principle of Yero is to put the user at the center of the Art.",
            "We provide the algorithm, your inputs make the final result."
        ],
    }, {
        title: "25% Donated To Charity!",
        imageSrc: cat,
        paragraphs: [
            "We care for the vain uptrend of the NFT but we also need the denials of the gods. That is why a part of the profits will be given back to several crypto communities."
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
                        const isColorReversed = index === (experiments.length - 1);
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