import React from "react";
import { Typography } from "@mui/material";
import styles from "./Modal.module.css";

import ModalContainer from "./ModalContainer";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

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
                     {/* <Modal
                        onClose={props.onCloseModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Text in a modal
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography>
                        </Box>
                    </Modal> */}
            </ModalContainer>
        </div>
    );
}

export default Modal;