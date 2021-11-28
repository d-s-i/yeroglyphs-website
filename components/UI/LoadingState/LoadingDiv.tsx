import styles from "./LoadingDiv.module.css";
import Typography from "@mui/material/Typography";
import LoadingSpinner from "./LoadingSpinner";

function LoadingDiv() {
    return(
        <div className={styles["loading-box"]} >
            <LoadingSpinner />
            <Typography component="h1">Loading...</Typography>
        </div>
    );
}

export default LoadingDiv;