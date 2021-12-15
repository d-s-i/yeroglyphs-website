import React from 'react';
import MyAppBar from '../../components/UI/AppBar/MyAppBar';
import AppContainer from '../../components/UI/AppContainer';
import CustomizedTypography from "../../components/UI/CustomizedTypography";
import Mint from "../../components/Mint/Mint";
import MintInfos from "../../components/Mint/MintInfos";
import BackgroundColor from "../../components/UI/BackgroundColor";

interface Props {
  isMintReleased: boolean;
}

export default function Minting(props: Props) {

  return (
    <React.Fragment>
        <MyAppBar isLP={false} isMintReleased={props.isMintReleased} />
        <div style={{ height: "90vh" }}>
          <AppContainer>
            <CustomizedTypography>Mint</CustomizedTypography>
            <Mint isMintReleased={props.isMintReleased} />
          </AppContainer>
        </div>
        <BackgroundColor light={false}>
          <MintInfos />
        </BackgroundColor>
    </React.Fragment>
  );
}