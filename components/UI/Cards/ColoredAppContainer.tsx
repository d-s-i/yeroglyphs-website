import React from "react";

import BackgroundColor from "./BackgroundColor";
import AppContainer from "./AppContainer";

interface Props {
    isLight: boolean;
    children: React.ReactNode;
}

const ColoredAppContainer = function(props: Props) {
    return(
        <BackgroundColor light={props.isLight}>
            <AppContainer>
                {props.children}
            </AppContainer>
        </BackgroundColor>
    );
}

export default ColoredAppContainer;