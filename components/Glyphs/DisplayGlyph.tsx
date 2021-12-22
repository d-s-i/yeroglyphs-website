import React from "react";

import { getYeroglyphs } from "../../ethereum/yeroglyphs";

import Image from "next/image";
import Typography from "@mui/material/Typography";
import LoadingButton from '@mui/lab/LoadingButton';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import GradeIcon from '@mui/icons-material/Grade';

import styles from "./DisplayGlyph.module.css";
import { goldColor } from "../../helpers/constant";

interface Props {
  src: string;
  id: string;
  index?: string | undefined;
  isGenesis?: boolean;
  isDynamic: boolean;
  canBeSaved: boolean;
  onSaveNft?: (id: any) => Promise<void>;
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
        <Typography sx={{ marginTop: "5%", marginBottom: "5%", color: "#e6e6e6" }} variant="h6" component="p">
          {props.isGenesis ? <span style={{ color: goldColor }}>{`Genesis Yero #${props.id}`}</span> : `Yero #${props.id}`}
        </Typography>
        {props.isDynamic && (
            <LoadingButton
                sx={{color: "#FFD700", borderColor: "#FFD700", "&:hover": { borderColor: "#FFD700", backgroundColor: "rgb(201, 19, 195, 0.04)" }}}
                color="secondary"
                onClick={() => onClicking(props.id)}
                loading={isLoading}
                loadingPosition="start"
                startIcon={<SaveAltIcon />}
                variant="outlined"
            >
                Save
            </LoadingButton>
        )}
        {(props.canBeSaved && props.index) && (
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
          </LoadingButton>
        )}
    </div>
  )
}

export default DisplayGlyph;
