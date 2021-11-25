import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const CustomizedAppBar = styled(AppBar)`
  background-color: #C913C3;
`;

function MyAppBar() {
    return(
        <Box sx={{ flexGrow: 1 }}>
            <CustomizedAppBar position="static" >
                <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Ᵹ Yeroglyphs
                </Typography>
                <Button color="inherit">Login</Button>
                </Toolbar>
            </CustomizedAppBar>
        </Box>
    );
}

export default MyAppBar;