import React from "react";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const MyTypography = styled(Typography)`
  margin-top: 3%;
  margin-bottom: 3%;
  font-weight: bold;
  color: #f3f4f6;
`;

interface Props {
    children: React.ReactNode;
}

function TitleTypography(props: Props) {
    return(<MyTypography variant="h3">{props.children}</MyTypography>);
}

export default TitleTypography;