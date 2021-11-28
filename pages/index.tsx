import type { NextPage } from "next";
import Head from "next/head";
import React from "react";

import FirstBlock from "../components/LandingPage/FirstBlock";
import SecondBlock from "../components/LandingPage/SecondBlock";
import MyAppBar from "../components/UI/AppBar/MyAppBar";
import AppContainer from "../components/UI/AppContainer";
import BackgroundColor from "../components/UI/BackgroundColor";
import Footer from "../components/LandingPage/Footer/Footer";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <React.Fragment>
      <div className={styles.container}>
        <Head>
          <title>Yero</title>
          <meta name="description" content="On Chain Generative Art" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </div>
      <MyAppBar />
      <BackgroundColor light={false}>
        <AppContainer isLandingPage>
          <FirstBlock />
        </AppContainer>
      </BackgroundColor>
      <BackgroundColor light={true}>
        <AppContainer isLandingPage>
            <SecondBlock />
        </AppContainer>
      </BackgroundColor>
      <Footer />
    </React.Fragment>
  )
}

export default Home;
