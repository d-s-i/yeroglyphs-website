import Typography from "@mui/material/Typography";
import Image from "next/image";
import styles from "./DisplayGlyph.module.css";

interface Props {
  src: string;
}

function DisplayGlyph(props: Props) {
  return (
      <div className={styles["glyph-box"]}>
        <div className={styles["glyph-image"]} >
          <Image src={props.src} width="320" height="320" />
        </div>
        <Typography variant="h6" component="div">Text</Typography>
    </div>
  )
}

export default DisplayGlyph;
