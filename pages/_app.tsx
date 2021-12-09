import '../styles/globals.css'
import type { AppProps } from 'next/app';
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

const isMintReleased = true;

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
