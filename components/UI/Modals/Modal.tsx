import React from "react";
import { Typography } from "@mui/material";
import styles from "./Modal.module.css";

import ModalContainer from "./ModalContainer";

interface Props {
    message: string;
    displayButton: boolean;
    onCloseModal: (event: React.MouseEvent) => void;   
}

function Modal(props: Props) {
    return(
        <div className={styles.backdrop} onClick={props.onCloseModal} >
            <ModalContainer>
                <div className={styles.modal}>
                    <Typography>{props.message}</Typography>
                    {props.displayButton && <button onClick={props.onCloseModal}>Ok</button>}
                </div>
            </ModalContainer>
        </div>
    );
}

export default Modal;