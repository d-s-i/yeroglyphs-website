import React from "react";
import styles from "./BackgroundColor.module.css";

interface Props {
    children: React.ReactNode;
    light: boolean;
    image?: StaticImageData;
}

function BackgroundColor(props: Props) {
    return(<div style={{ backgroundImage: `url(${props.image?.src})` }} className={props.light ? styles["light-background"] : styles["dark-background"]} >{props.children}</div>);
}

export default BackgroundColor;