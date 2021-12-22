import React from 'react';
import MyAppBar from '../../components/UI/AppBar/MyAppBar';
import AppContainer from '../../components/UI/Cards/AppContainer';
import TitleTypography from "../../components/UI/Text/TitleTypography";
import Claim from "../../components/Mint/Claim";
import Footer from '../../components/LandingPage/Footer/Footer';

export default function Minting() {

  return (
    <React.Fragment>
        <MyAppBar isLP={false} />
        <div style={{ height: "90vh" }}>
          <AppContainer>
            <TitleTypography>Claim your previously minted Yero for a New Yero</TitleTypography>
            <Claim />
          </AppContainer>
        </div>
        <Footer />
    </React.Fragment>
  );
}