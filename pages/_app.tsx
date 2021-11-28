import '../styles/globals.css'
import type { AppProps } from 'next/app';
import { AuthContextProvider } from "../store/authContext";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import "@fontsource/eb-garamond";

const theme = createTheme({
  typography: {
    "fontFamily": "EB Garamond"
  }
});

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
       <Component {...pageProps} />
      </ThemeProvider>
    </AuthContextProvider>
  );
}

export default MyApp
