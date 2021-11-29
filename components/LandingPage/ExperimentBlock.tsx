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
        title: "Fully OnChain Art",
        imageSrc: sarco,
        firstParagraph: "People often get excited with new NFTs, but please, do NOT FOMO. We made this to try something new and see how it goes. We will keep exploring the space and build upon it.",
        secondParagraph: "If you are here for the art, you are at the right place. We created a new mechanism that that will probably generate some excitement about generative art."
    }, {
        title: "User is the Main Actor",
        imageSrc: pharaoh,
        firstParagraph: "The Core Principle of Yero is to put the user at the center of the Art.",
        secondParagraph: "We provide the algorithm, your inputs make the final result."
    }, {
        title: "25% Donated To Charity!",
        imageSrc: cat,
        firstParagraph: "We care for the uptrend of the NFT but we also care about the ecosystem. That is why 25% of the profits made by Yero will be given back to several crypto communities via Gitcoin, a donation plateform on Ethereum based on quadratic funding."
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
            {/* <Grid item sx={{ width: "100%", marginBottom: "4%" }}>
                <Container maxWidth="md">
                    <Typography component="p" variant="h5" color="primary" >
                        Yeros are the first “on-chain”, “customizable” generative art on the boba network. 
                    </Typography>
                    <Typography component="p" variant="h5" color="primary" sx={{ marginTop: "1%" }}>
                        The contract follow a special algorithm, allowing its owners to create art on demand, and creating extra-rarity for their NFT.  We are exploring a new way of managing onchain art and may be forked along the way by speculators, but remember, this is all about the art.
                    </Typography>
                </Container>
            </Grid> */}
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
                                firstParagraph={experiment.firstParagraph} 
                                secondParagraph={experiment.secondParagraph}
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