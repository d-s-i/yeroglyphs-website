import HotExperimentCard from "../UI/Cards/HotExperimentCard";
import yeroPlanet from "../../public/yeroPlanet.png";
import yeroEye from "../../public/yeroEye.png";
import yeroHeart from "../../public/yeroHeart.png";

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import styles from "./SecondBlock.module.css";

const experiments = [
    {
        title: "Fully OnChain Art",
        imageSrc: yeroPlanet,
        firstParagraph: "People often get excited with new NFTs, but please, do NOT FOMO. We made this to try something new and see how it goes. We will keep exploring the space and build upon it.",
        secondParagraph: "If you are here for the art, you are at the right place. We created a new mechanism that that will probably generate some excitement about generative art."
    }, {
        title: "User is the Main Actor",
        imageSrc: yeroEye,
        firstParagraph: "The Core Principle of Yero is to put the user at the center of the Art.",
        secondParagraph: "We provide the algorithm, your inputs make the final result."
    }, {
        title: "25% Donated To Charity!",
        imageSrc: yeroHeart,
        firstParagraph: "We care for the uptrend of the NFT but we also care about the ecosystem. That is why 25% of the profits made by Yero will be given back to several crypto communities via Gitcoin, a donation plateform on Ethereum based on quadratic funding."
    }

];

function SecondBlock() {
    return(
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <Grid item>
                <Typography align="center" component="h2" variant="h3" color="primary" sx={{border: "1px red solid", width: "100%"}}>
                    What is <span className="goldColor">Yero</span> ?
                </Typography>
            </Grid>
            <Grid item sx={{border: "1px red solid", width: "100%"}}>
                <div style={{margin: "0% 20% 0% 20%"}}>
                    <Typography component="p" variant="h6" color="primary">
                        Yeros are the first “on-chain”, “customizable” generative art on the boba network. 
                    </Typography>
                    <Typography component="p" variant="h6" color="primary" sx={{marginTop: "1%"}}>
                        The contract follow a special algorithm, allowing its owners to create art on demand, and creating extra-rarity for their NFT.  We are exploring a new way of managing onchain art and may be forked along the way by speculators, but remember, this is all about the art.
                    </Typography>
                </div>
            </Grid>
            <Grid item sx={{border: "1px red solid", width: "100%"}}>
                <div style={{margin: "0% 20% 0% 20%"}}>
                    {experiments.map(experiment => {
                        return(
                            <HotExperimentCard 
                                title={experiment.title} 
                                index={experiments.indexOf(experiment) + 1} 
                                image={experiment.imageSrc}  
                                firstParagraph={experiment.firstParagraph} 
                                secondParagraph={experiment.secondParagraph}
                            />
                        );
                    })}
                </div>
            </Grid>
        </Grid>
    );
}

export default SecondBlock;