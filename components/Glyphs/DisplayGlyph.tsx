import React from "react";

import Image from "next/image";
import Typography from "@mui/material/Typography";
import LoadingButton from '@mui/lab/LoadingButton';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

import styles from "./DisplayGlyph.module.css";

interface Props {
  src: string;
  id: string;
  isDynamic: boolean;
  onSaveNft?: (id: any) => Promise<void>;
  index?: { isTrue: boolean, value: number };
}

function DisplayGlyph(props: Props) {

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onClicking(id:string) {
    if(!props.onSaveNft) return;
    setIsLoading(true);
    try {
      await props.onSaveNft(id);
    } catch(error) {
      console.log(error);
    }
    setIsLoading(false);
  }
  
  return (
      <div className={styles["glyph-box"]}>
        <div className={styles["glyph-image"]} >
          <Image src={props.src} width="320" height="320" />
        </div>
        <Typography sx={{marginTop: "5%", marginBottom: "5%", color: "#e6e6e6"}} variant="h6" component="p">{`Yeroglyphs #${props.id}`}</Typography>
        {props.isDynamic && (
            <LoadingButton
                sx={{color: "#FFD700", borderColor: "#FFD700", "&:hover": {borderColor: "#FFD700", backgroundColor: "rgb(201, 19, 195, 0.04)"}}}
                color="secondary"
                onClick={() => onClicking(props.id)}
                loading={isLoading}
                loadingPosition="start"
                startIcon={<SaveAltIcon />}
                variant="outlined"
            >
                Save
            </LoadingButton>)
        }
        {props.index && props.index.isTrue && <Typography component="p" variant="subtitle1">{`Index: ${props.index.value}`}</Typography>}
    </div>
  )
}

export default DisplayGlyph;
