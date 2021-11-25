import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Script from "next/script";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Yerogrlyphs</title>
        <meta name="description" content="On Chain Generative Art" />
        <link rel="icon" href="/favicon.ico" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/d3/5.12.0/d3.min.js" type="text/javascript" strategy="beforeInteractive" /> 
      </Head>
    </div>
  )
}

export default Home;
