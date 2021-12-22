import React from "react";
import styles from "./GlyphsContainer.module.css";

import Grid from "@mui/material/Grid";

interface Props {
    children: React.ReactNode;
    containMany?: boolean;
}

function GlyphContainer(props: Props) {

    return(

        <div className={`${styles["glyph-container"]} ${props.containMany ? `${styles.border}` : ""}`}>
            <Grid container sx={{ display: "flex", justifyContent: "space-around" }} >
                {props.children}
            </Grid>
        </div>
    );
}

export default GlyphContainer;