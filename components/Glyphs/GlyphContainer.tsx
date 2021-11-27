import React from "react";
import styles from "./GlyphsContainer.module.css";

interface Props {
    children: React.ReactNode;
    containMany?: boolean;
}

function GlyphContainer(props: Props) {
    return(
        <div className={`${styles["glyph-container"]} ${props.containMany ? `${styles.border}` : ""}`} >
            {props.children}
        </div>
    );
}

export default GlyphContainer;