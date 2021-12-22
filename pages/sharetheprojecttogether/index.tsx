import React, { useState } from 'react';
import MyAppBar from '../../components/UI/AppBar/MyAppBar';
import AppContainer from '../../components/UI/Cards/AppContainer';
import TitleTypography from "../../components/UI/Text/TitleTypography";
import Footer from "../../components/LandingPage/Footer/Footer";
import BackgroundColor from "../../components/UI/Cards/BackgroundColor";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CopyTextCard from '../../components/UI/Cards/CopyTextCard';

import { marketingText } from "../../helpers/constant";

export default function Marketing() {

  const [idCopeid, setIdCopied] = useState<number>();
  const [toogleCopy, setToogleCopy] = useState<boolean>(false);

  function startToogleCopy() {
    setToogleCopy(!toogleCopy);
  }
  
  function getCopiedId(id: number): number {
    setIdCopied(id);
    return id;
  }

  return (
    <React.Fragment>
        <BackgroundColor light={true}>
        <MyAppBar isLP={true} />
          <AppContainer>
            <TitleTypography>Share the project!</TitleTypography>
            <Grid 
              container 
              sx={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  justifyContent: "center", 
                  alignItems: "center" 
              }}
            >
              {marketingText.map(message => {
                const id = marketingText.indexOf(message);
                return(
                  <CopyTextCard 
                    key={id} 
                    text={message.text} 
                    title={message.title} 
                    id={id + 1} 
                    isLast={id === marketingText.length - 1} 
                    copiedId={idCopeid}
                    toogleCopy={startToogleCopy}
                    onCopy={getCopiedId}
                  />
                );
              })}
            </Grid>
          </AppContainer>
          <div style={{ paddingTop: "5%" }}></div>
        </BackgroundColor>
        <Footer />
    </React.Fragment>
  );
}