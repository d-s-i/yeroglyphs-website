import React from "react";
import styles from "./GlyphsContainer.module.css";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

interface Props {
    children: React.ReactNode;
    containMany?: boolean;
}

function GlyphContainer(props: Props) {

    const borderClass = {
        backgroundColor: "#0d0d0d",
        border: "1px #333333 solid",
        borderRadius: "1em",
        marginBottom: "3%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center"
    };

    const glyphContainer = {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        width: "100%"
    };

    const style = props.containMany ? { ...borderClass, ...glyphContainer} : {};

    // className={`${styles["glyph-container"]} ${props.containMany ? `${styles.border}` : ""}`}
    
    return(
        // <Container maxWidth="lg" 
        //     sx={{ display: "flex", justifyContent: "space-around" }}
        // >
        <div className={`${styles["glyph-container"]} ${props.containMany ? `${styles.border}` : ""}`}>
            <Grid container sx={{ display: "flex", justifyContent: "space-around" }} >
                {props.children}
            </Grid>
        </div>
        // </Container>
    );
}

export default GlyphContainer;