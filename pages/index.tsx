import type { NextPage } from "next";
import React from "react";

import HookBlock from "../components/LandingPage/HookBlock";
import ExperimentBlock from "../components/LandingPage/ExperimentBlock";
import MyAppBar from "../components/UI/AppBar/MyAppBar";
import ColoredAppContainer from "../components/UI/Cards/ColoredAppContainer";
import Footer from "../components/LandingPage/Footer/Footer";
import styles from "../styles/Home.module.css";
import ExplanationBlock from "../components/LandingPage/ExplanationBlock";
import TokenomicsBlock from "../components/LandingPage/TokenomicsBlock";
import TutoBlock from "../components/LandingPage/TutoBlock";
import GroupPresentationBlock from "../components/LandingPage/GroupPresentationBlock";

const FIRST_BACKGROUND_COLOR = false;

const Home: NextPage = () => {
  
  return (
    <React.Fragment>
      <MyAppBar isLP={true} />
      <ColoredAppContainer isLight={FIRST_BACKGROUND_COLOR}>
        <HookBlock />
      </ColoredAppContainer>
      <ColoredAppContainer isLight={FIRST_BACKGROUND_COLOR}>
        <ExperimentBlock />
      </ColoredAppContainer>
      <ColoredAppContainer isLight={FIRST_BACKGROUND_COLOR}>
        <ExplanationBlock />
      </ColoredAppContainer>
      <ColoredAppContainer isLight={FIRST_BACKGROUND_COLOR}>
        <GroupPresentationBlock />
      </ColoredAppContainer>
      <ColoredAppContainer isLight={FIRST_BACKGROUND_COLOR}>
        <TokenomicsBlock />
      </ColoredAppContainer>
      <ColoredAppContainer isLight={FIRST_BACKGROUND_COLOR}>
        <TutoBlock />
      </ColoredAppContainer>
      <Footer />
    </React.Fragment>
  )
}

export default Home;
