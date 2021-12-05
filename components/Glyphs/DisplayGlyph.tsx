import React from "react";

import Image from "next/image";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
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

        // <Grid item sx={{
      //     border: "1px rgb(51, 51, 51, 0.8) solid",
      //     backgroundColor: "rgb(13, 13, 13, 0.5)",
      //     // boxShadow: "6px 6px 2px 1px rgb(230, 230, 230, 0.1)",
      //     padding: "5% 5% 2.5% 5%",
      //     display: "flex",
      //     minWidth: "300px",
      //     flexDirection: "column",
      //     justifyContent: "center",
      //     alignItems: "center",
      //     marginBottom: "3%",
      //     boxShadow: "24%"
      //   }}>
  
  return (
      <div className={styles["glyph-box"]}>

        <div className={styles["glyph-image"]} >
          <Image src={props.src} alt={`yero-${props.id}`} width="320" height="320" />
        </div>
        <Typography sx={{ marginTop: "5%", marginBottom: "5%", color: "#e6e6e6" }} variant="h6" component="p">{`Yeroglyphs #${props.id}`}</Typography>
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
