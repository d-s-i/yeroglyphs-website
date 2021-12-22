import React from 'react';
import MyAppBar from '../../components/UI/AppBar/MyAppBar';
import AppContainer from '../../components/UI/Cards/AppContainer';
import Hourglass from '../../components/UI/Hourglass';
import { Grid, Typography } from '@mui/material';

export default function Minting() {

  return (
    <React.Fragment>
        <MyAppBar isLP={false} />
        <div style={{ height: "90vh" }}>
          <AppContainer>
              <Grid container sx={{ height: "90vh" }} >
                  <Grid item xs={12} sx={{ display: "flex", flexDirection: "column",  alignItems: "center" }}>
                      <Typography component="p" variant="h3" color="primary" align="center" sx={{ marginTop: "10%", marginBottom: "5%" }}>
                        Mint will be released on the 18th of December at 15:00 UTC
                      </Typography>
                      <Hourglass />
                  </Grid>
              </Grid>
          </AppContainer>
        </div>
    </React.Fragment>
  );
}