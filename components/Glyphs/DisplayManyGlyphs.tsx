import React, { useState } from "react";
import Image from "next/image";

import LoadingButton from '@mui/lab/LoadingButton';
import GradeIcon from '@mui/icons-material/Grade';
import Typography from "@mui/material/Typography";
import styles from "./DisplayManyGlyphs.module.css";

import { getYeroglyphs } from "../../ethereum/yeroglyphs";

interface Props {
  src: string;
  id: string;
  onSaveNft?: (id: any) => Promise<void>;
  index?: string;
}

function DisplayManyGlyphs(props: Props) {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function saveTokenURIHandler() {
        if(!props.index) return;
        setIsLoading(true);
        const yero = await getYeroglyphs();

        try {
            await yero.setTokenIdDefaultIndex(props.id, props.index);
        } catch (error) {
            console.log(error);
        }
        
        setIsLoading(false);
    }
  
  return (
      <div className={styles["glyph-box"]}>
        <div className={styles["glyph-image"]} >
          <Image src={props.src} alt={`yero-${props.id}`} width="320" height="320" />
        </div>
        <Typography sx={{marginTop: "5%", marginBottom: "5%", color: "#e6e6e6"}} variant="h6" component="p">{`Yeroglyphs #${props.id}`}</Typography>
        {props.index && (
            <LoadingButton
                sx={{color: "#FFD700", borderColor: "#FFD700", "&:hover": {borderColor: "#FFD700", backgroundColor: "rgb(201, 19, 195, 0.04)"}}}
                color="secondary"
                onClick={saveTokenURIHandler}
                loading={isLoading}
                loadingPosition="start"
                startIcon={<GradeIcon />}
                variant="outlined"
            >
                Set Default
            </LoadingButton>)
        }
    </div>
  )
}

export default DisplayManyGlyphs;
