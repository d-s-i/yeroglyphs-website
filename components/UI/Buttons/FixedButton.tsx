import Button from "@mui/material/Button";
import RefreshIcon from '@mui/icons-material/Refresh';

interface Props {
    onRefresh: () => {}
}

function FixedButton(props: Props) {
    return(
        <Button 
            variant="contained" 
            endIcon={<RefreshIcon />} 
            sx={{
                position: "fixed", 
                right: "17.5%", 
                background: "linear-gradient(to bottom right, #ffff99 -12%, #c913c3 100%)",
                color: "#333333",
                textTransform: "none", 
                fontWeight: "bold"
            }}
            onClick={props.onRefresh}
        >
            Refresh
        </Button>
    );
}

export default FixedButton;