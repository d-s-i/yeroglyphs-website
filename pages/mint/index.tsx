import React, { useState } from 'react';
import MyAppBar from '../../components/UI/AppBar/MyAppBar';
import AppContainer from '../../components/UI/AppContainer';
import CustomizedTypography from "../../components/UI/CustomizedTypography";
import Mint from "../../components/Mint/Mint";

interface Props {
  isMintReleased: boolean;
}

export default function Minting(props: Props) {

  return (
    <React.Fragment>
        <MyAppBar isLP={false} isMintReleased={props.isMintReleased} />
        <AppContainer>
          <CustomizedTypography>Mint</CustomizedTypography>
          <Mint />
        </AppContainer>
    </React.Fragment>
  );
}