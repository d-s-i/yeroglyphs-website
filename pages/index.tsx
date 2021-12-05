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

  function triggerDownload() {
    const stringContent = `Hello sir, thank you for coming here. My name is Sadiki, and I am subordinate of the amazingly smart Ramesses III. 
    I have a question where I couldn’t find an answer, maybe you would help me?
    Ramesses III was talking to a group of persons the other day, and I noticed that two of them looked relatively similar. 
    Here is was I asked to Ramesses III once the farewells have been addressed: 
    “Ramesses III, I am asking to your sharp mind, would  you say that those two boys were twins ?” 
    – “Ah but they’re not” he told me with a seldom-seen smile. And then seeing me stuck in my mind, 
    he added “They were however born on exactly the same day of the same year and to the same mother.” 
    - “Is that not almost precisely the definition of twins?” I asked, somewhat mystified. 
    But Ramesses III was right, the two boys were not twins. What could explain this apparent enigma?
    
    Note : 
    - There is only 1 answer to this
    - Only answer on the public telegram channel will be accepted`;
    const blob = new Blob([stringContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
  
    a.href = url;
    a.download = "enigma.txt";
    a.click();
    URL.revokeObjectURL(url);
  }
  
  return (
    <React.Fragment>
      <div className={styles.container}>
        <Head>
          <title>Yero</title>
          <meta name="description" content="On Chain Generative Art" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </div>
      <MyAppBar isLP={true} isMintReleased={props.isMintReleased} />
      <BackgroundColor light={FIRST_BACKGROUND_COLOR}>
        <AppContainer>
          <HookBlock isMintReleased={props.isMintReleased} />
        </AppContainer>
      </BackgroundColor>
      <BackgroundColor light={!FIRST_BACKGROUND_COLOR}>
        <AppContainer>
            <ExperimentBlock isMintReleased={props.isMintReleased} />
        </AppContainer>
      </BackgroundColor>
      <BackgroundColor light={FIRST_BACKGROUND_COLOR}>
        <AppContainer>
          <ExplanationBlock isMintReleased={props.isMintReleased} />
        </AppContainer>
      </BackgroundColor>
      <BackgroundColor light={!FIRST_BACKGROUND_COLOR}>
        <AppContainer>
          <GroupPresentationBlock />
        </AppContainer>
      </BackgroundColor>
      <BackgroundColor light={FIRST_BACKGROUND_COLOR}>
        <AppContainer>
          <TokenomicsBlock isMintReleased={props.isMintReleased} />
        </AppContainer>
      </BackgroundColor>
      <BackgroundColor light={!FIRST_BACKGROUND_COLOR} image={moonImage}>
        <AppContainer>
          <TutoBlock isMintReleased={props.isMintReleased} />
        </AppContainer>
      <button onClick={triggerDownload} className={styles["enigma-button"]} ></button>
      </BackgroundColor>
      <Footer />
    </React.Fragment>
  )
}

export default Home;
