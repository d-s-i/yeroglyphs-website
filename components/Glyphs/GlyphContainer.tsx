import React from "react";
import styles from "./GlyphsContainer.module.css";

interface Props {
    children: React.ReactNode;
}

function GlyphContainer(props: Props) {
    return(
        <div className={styles["glyph-container"]} >
            {props.children}
        </div>
    );
}

export default GlyphContainer;