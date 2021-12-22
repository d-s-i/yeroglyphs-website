import React from 'react';
import MyAppBar from '../../components/UI/AppBar/MyAppBar';
import AppContainer from '../../components/UI/Cards/AppContainer';
import TitleTypography from "../../components/UI/Text/TitleTypography";
import Mint from "../../components/Mint/Mint";
import MintInfos from "../../components/Mint/MintInfos";
import BackgroundColor from "../../components/UI/Cards/BackgroundColor";
import Footer from '../../components/LandingPage/Footer/Footer';

export default function Minting() {

  return (
    <React.Fragment>
        <MyAppBar isLP={false} />
        <div style={{ height: "90vh" }}>
          <AppContainer>
            <TitleTypography>Mint</TitleTypography>
            <Mint />
          </AppContainer>
        </div>
        <BackgroundColor light={false}>
          <MintInfos />
        </BackgroundColor>
        <Footer />
    </React.Fragment>
  );
}