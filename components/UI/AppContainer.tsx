// import styles from "./AppContainer.module.css";

// interface Props {
//     children: React.ReactNode;
//     isLandingPage?: boolean;
// }

// function AppContainer(props: Props) {
//     return(
//         <div className={props.isLandingPage ? styles["LP-container"] : styles["app-container"]} >{props.children}</div>
//     );
// }

// export default AppContainer;

import * as React from 'react';
import Container from '@mui/material/Container';

interface Props {
    children: React.ReactNode;
    isLandingPage?: boolean;
}

export default function SimpleContainer(props: Props) {
  return (
    <Container maxWidth="xl">
      {props.children}
    </Container>
  );
}