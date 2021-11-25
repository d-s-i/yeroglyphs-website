import type { NextPage } from "next";
import styles from "./DisplayGlyph.module.css";

const DisplayGlyph: NextPage = () => {
  return (
    <div className={styles["glyph-container"]}>
        <div id="grid"></div>
    </div>
  )
}

export default DisplayGlyph;
