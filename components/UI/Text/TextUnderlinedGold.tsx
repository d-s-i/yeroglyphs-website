import React from "react";

import styles from "./TextUnderlinedGold.module.css";

interface Props {
    children: React.ReactNode;
}

function TextUnderlinedGold(props: Props) {
    return(
        <span className={`goldColor ${styles.underlined}`}>{props.children}</span>
    );
}

export default TextUnderlinedGold;