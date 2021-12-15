import React, { useState } from 'react';
import MyAppBar from '../../components/UI/AppBar/MyAppBar';
import AppContainer from '../../components/UI/AppContainer';
import CustomizedTypography from "../../components/UI/CustomizedTypography";
import Footer from "../../components/LandingPage/Footer/Footer";
import BackgroundColor from "../../components/UI/BackgroundColor";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CopyTextCard from '../../components/UI/Cards/CopyTextCard';

import { marketingText } from "../../helpers/constant";

interface Props {
  isMintReleased: boolean;
}

export default function Marketing(props: Props) {

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
        <MyAppBar isLP={true} isMintReleased={props.isMintReleased} />
            <AppContainer>
                <CustomizedTypography>Share the project!</CustomizedTypography>
                <Grid container sx={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    justifyContent: "center", 
                    alignItems: "center" 
                }}>
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