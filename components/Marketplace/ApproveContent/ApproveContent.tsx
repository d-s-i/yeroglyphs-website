import React from "react";

import { getWeth } from "../../../ethereum/weth";
import { marketplaceAddress } from "../../../ethereum/marketplace";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import LoadingButton from '@mui/lab/LoadingButton';
import { goldColor } from "../../../helpers/constant";

interface ApproveProps {
    onApproving: (_needApproval: boolean) => void;
}

function ApproveContent(approveProps: ApproveProps) {

    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    async function approveWeth() {
        const weth = await getWeth();

        const provider = weth.signer.provider;
        if(!provider) return;

        setIsLoading(true);
        try {
            const approve_tx = await weth.approve(marketplaceAddress, BigInt(2**255));
            provider.once(approve_tx.hash, function() {
                setIsLoading(false);
                approveProps.onApproving(false);
            })

        } catch(error) {
            console.log(error);
        }
        
    }
    
    return(
        <Grid container>
            <Grid item xs={12}>
                <Typography component="p" variant="h6">Before making an offer, tou need to approve wETH</Typography>
            </Grid>
            <Grid item xs={12}  sx={{ display: "flex", justifyContent: "center", padding: "3% 0% 3% 0%" }}>
                <LoadingButton 
                    size="large" 
                    loading={isLoading} 
                    variant="contained" 
                    onClick={approveWeth}
                    sx={{ backgroundColor: goldColor, fontWeight: "bold" }}
                >
                    Approve
                </LoadingButton>
            </Grid>
        </Grid>
    );
}

export default ApproveContent;