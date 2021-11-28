import React from "react";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const MyTypography = styled(Typography)`
  margin-top: 3%;
  margin-bottom: 3%;
  font-weight: bold;
  color: #e6e6e6;
`;

interface Props {
    children: React.ReactNode;
}

function CustomizedTypography(props: Props) {
    return(<MyTypography variant="h3">{props.children}</MyTypography>);
}

export default CustomizedTypography;