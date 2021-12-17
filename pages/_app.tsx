import '../styles/globals.css'
import type { AppProps } from 'next/app';
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { AuthContextProvider } from "../store/authContext";

import { ThemeProvider, createTheme, responsiveFontSizes  } from '@mui/material/styles';
import "@fontsource/eb-garamond";

declare module '@mui/material/styles' {
  interface TypographyVariants {
    poster: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    poster?: React.CSSProperties;
  }
}

let theme = createTheme(
  {
    typography: {
      fontFamily: "EB Garamond"
    },
    palette: {
      primary: {
        main: "#f3f4f6",
      },
    },
  }
);

theme = responsiveFontSizes(theme);

const isMintReleased = false;

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
      <div className={styles.container}>
        <Head>
          <title>Yero</title>
          <meta name="description" content="On Chain Generative Art" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </div>
       <Component {...pageProps} isMintReleased={isMintReleased}/>
      </ThemeProvider>
    </AuthContextProvider>
  );
}

export default MyApp
