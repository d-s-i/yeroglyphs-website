import '../styles/globals.css'
import type { AppProps } from 'next/app';
import { AuthContextProvider } from "../store/authContext";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import "@fontsource/eb-garamond";

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

const theme = createTheme({
  typography: {
    "fontFamily": "EB Garamond"
  },
  palette: {
    primary: {
      main: "#f3f4f6",
    },
  },
});

const isMintReleased = false;

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
       <Component {...pageProps} isMintReleased={isMintReleased}/>
      </ThemeProvider>
    </AuthContextProvider>
  );
}

export default MyApp
