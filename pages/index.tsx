import type { NextPage } from "next";
import Head from "next/head";
import React from "react";

import HookBlock from "../components/LandingPage/HookBlock";
import ExperimentBlock from "../components/LandingPage/ExperimentBlock";
import MyAppBar from "../components/UI/AppBar/MyAppBar";
import AppContainer from "../components/UI/AppContainer";
import BackgroundColor from "../components/UI/BackgroundColor";
import Footer from "../components/LandingPage/Footer/Footer";
import styles from "../styles/Home.module.css";
import ExplanationBlock from "../components/LandingPage/ExplanationBlock";
import TokenomicsBlock from "../components/LandingPage/TokenomicsBlock";
import TutoBlock from "../components/LandingPage/TutoBlock";
import GroupPresentationBlock from "../components/LandingPage/GroupPresentationBlock";

import moonImage from "../public/moon.jpg";

interface Props {
  isMintReleased: boolean;
}

const FIRST_BACKGROUND_COLOR = false;

const Home = (props: Props) => {
  return (
    <React.Fragment>
      <div className={styles.container}>
        <Head>
          <title>Yero</title>
          <meta name="description" content="On Chain Generative Art" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </div>
      <MyAppBar isMintReleased={props.isMintReleased} />
      <BackgroundColor light={FIRST_BACKGROUND_COLOR}>
        <AppContainer isLandingPage>
          <HookBlock isMintReleased={props.isMintReleased} />
        </AppContainer>
      </BackgroundColor>
      <BackgroundColor light={!FIRST_BACKGROUND_COLOR}>
        <AppContainer isLandingPage>
            <ExperimentBlock isMintReleased={props.isMintReleased} />
        </AppContainer>
      </BackgroundColor>
      <BackgroundColor light={FIRST_BACKGROUND_COLOR}>
        <AppContainer isLandingPage>
          <ExplanationBlock isMintReleased={props.isMintReleased} />
        </AppContainer>
      </BackgroundColor>
      <BackgroundColor light={!FIRST_BACKGROUND_COLOR}>
        <AppContainer isLandingPage>
          <GroupPresentationBlock />
        </AppContainer>
      </BackgroundColor>
      <BackgroundColor light={FIRST_BACKGROUND_COLOR}>
        <AppContainer isLandingPage>
          <TokenomicsBlock isMintReleased={props.isMintReleased} />
        </AppContainer>
      </BackgroundColor>
      <BackgroundColor light={!FIRST_BACKGROUND_COLOR} image={moonImage}>
        <AppContainer isLandingPage>
          <TutoBlock isMintReleased={props.isMintReleased} />
        </AppContainer>
      </BackgroundColor>
      <Footer />
    </React.Fragment>
  )
}

export default Home;
