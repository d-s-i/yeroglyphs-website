import React from "react";
import styles from "./BackgroundColor.module.css";

interface Props {
    children: React.ReactNode;
    light: boolean;
}

function BackgroundColor(props: Props) {
    return(<div className={props.light ? styles["light-background"] : styles["dark-background"]} >{props.children}</div>);
}

export default BackgroundColor;