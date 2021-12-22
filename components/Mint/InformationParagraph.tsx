import React from "react";
import { Typography } from "@mui/material";
import CollapseGroupItem from "../UI/CollapseGroupItem";

interface InformationProps {
    title: string;
    mainSentence: JSX.Element;
    details: JSX.Element[];
}

function InformationParagraph(informationProps: InformationProps) {
    return(
        <React.Fragment>
            <Typography component="p" variant="h5" color="primary" sx={{ margin: "4% 0% 4% 0%", fontWeight: "bold" }}>{informationProps.title}</Typography>
            <CollapseGroupItem main={informationProps.mainSentence} details={informationProps.details} />
        </React.Fragment>
    );
}

export default InformationParagraph;