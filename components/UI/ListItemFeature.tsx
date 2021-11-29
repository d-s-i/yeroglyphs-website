import React from "react";
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from "@mui/material/Typography";

interface Props {
    text: string;
    bullet: string;
    bulletColor: string;
    textColor: string;
}  
  
function ListItemFeature(props: Props) {
    return(
        <Grid item sx={{ width: "100%", margin: 0 }}>
            <List sx={{padding: 0, margin: 0}}>
                <ListItem sx={{padding: 0, margin: 0}}>
                <Typography variant="h6" component="p" color="primary" sx={{fontWeight: "bold", paddingRight: "3%", color: props.bulletColor}}>{props.bullet}</Typography>
                  <ListItemText
                    disableTypography 
                    sx={{padding: 0, margin: 0, fontSize: "1.5em", color: props.textColor}}
                    primary={`${props.text}`}
                  />
                </ListItem>
            </List>
        </Grid>
    );
}

export default ListItemFeature;