import React, { useRef, useState }  from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import Fingerprint from '@mui/icons-material/Fingerprint';
import { goldColor } from "../../../constant";

import styles from "./CopyTextCard.module.css";

interface Props {
    text: string;
    title: string;
    id: number; 
    isLast: boolean;
}

function CopyTextCard(props: Props) {

    const textAreaRef = useRef(null);

    function copyToClipboard() {
        const range = document.createRange();
        if(!textAreaRef.current) return;
        range.selectNode(textAreaRef.current);
        window?.getSelection()!.addRange(range);
    
        try {
          document.execCommand('copy');
        } catch(err) {
          console.log('Oops, unable to copy');
        }
    
        window?.getSelection()!.removeRange(range);
    };
    
    return(
        <Grid item sm={12} md={8} lg={6}>
                <Typography component="p" variant="h5" color="primary" sx={{ marginTop: "5%", marginBottom: "5%" }}>{`Message #${props.id} - ${props.title}`}</Typography>
            <Grid item xs={12} sx={{ 
                backgroundColor: "#262626", 
                width: "100%", 
                marginTop: "2%",
                display: "flex", 
                justifyContent: "space-between", 
                borderLeft: `3px ${goldColor} solid`,   
                padding: "2% 1% 2% 3%",
            }}>
                <Typography component="p" variant="h6" ref={textAreaRef} color="primary" >{props.text}</Typography>
                <div className={styles["copy-container"]}>
                    <IconButton 
                        aria-label="copy" 
                        size="small" 
                        onClick={copyToClipboard} 
                        sx={{ color: "#f3f4f6", "&:hover": { cursor: "pointer" } }}
                    >
                        <ContentCopyIcon />
                    </IconButton>
                    <span className={styles["copy-label"]} >Copy</span>
                </div>
            </Grid>
            {!props.isLast && <div style={{ borderBottom: "1px #4d4d4d solid", marginTop: "8%" }} ></div>}
        </Grid>
    );
}

export default CopyTextCard;