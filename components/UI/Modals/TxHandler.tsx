import { Typography, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid";
import styles from "./TxHandler.module.css";

interface Props {
    message: string;
    statut: string;
    onClose: () => void;
}

function TxHandler(props: Props) {
    
    return(
        <div className={styles[props.statut]} style={{ width: "100%" }} >
            <Grid container sx={{ display: "flex", color: "white", alignItems: "center" }}>
                {props.statut === "pending" && <CircularProgress size={"1em"} />}
                <Typography sx={{ marginLeft: "3%" }} >{props.message}</Typography>
            </Grid>
            <button className={styles["quit-button"]} onClick={props.onClose} >&#9587;</button>
        </div>
    );
}

export default TxHandler;