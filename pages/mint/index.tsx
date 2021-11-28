import React, { useState } from 'react';
import MyAppBar from '../../components/UI/MyAppBar';
import AppContainer from '../../components/UI/AppContainer';
import CustomizedTypography from "../../components/UI/CustomizedTypography";
import Mint from "../../components/Mint/Mint";

export default function Minting() {

  return (
    <React.Fragment>
        <MyAppBar />
        <AppContainer>
          <CustomizedTypography>Mint</CustomizedTypography>
          <Mint />
        </AppContainer>
    </React.Fragment>
  );
}