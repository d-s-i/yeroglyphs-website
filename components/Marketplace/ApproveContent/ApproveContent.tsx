import React from "react";
import { useAuthContext } from "../../../store/authContext";

import { ethers } from "ethers";
import { getWeth } from "../../../ethereum/weth";
import ERC721ABI from "../../../ethereum/abis/ERC721ABI.json";
import { marketplaceAddress } from "../../../ethereum/marketplace";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import LoadingButton from '@mui/lab/LoadingButton';
import { goldColor } from "../../../helpers/constant";

interface ApproveProps {
    nftAddress?: string | string[] | undefined;
    approveWhat: string;
    onApproving: (_needApproval: boolean) => void;
}

function ApproveContent(approveProps: ApproveProps) {

    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const authContext = useAuthContext();

    const approveWeth = async function() {
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

    const approveNft = async function() {
        if(typeof(approveProps.nftAddress) !== "string") return;
        const nft = await new ethers.Contract(approveProps.nftAddress, ERC721ABI, authContext.signer);

        await nft.setApprovalForAll(marketplaceAddress, true);
    }
    
    return(
        <Grid container>
            <Grid item xs={12}>
                <Typography component="p" variant="h6" color="primary">Before making an offer, you need to approve wETH</Typography>
            </Grid>
            <Grid item xs={12}  sx={{ display: "flex", justifyContent: "center", padding: "3% 0% 3% 0%" }}>
                <LoadingButton 
                    size="large" 
                    loading={isLoading} 
                    variant="contained" 
                    onClick={approveProps.approveWhat === "weth" ? approveWeth : approveNft}
                    sx={{ backgroundColor: goldColor, fontWeight: "bold" }}
                >
                    Approve
                </LoadingButton>
            </Grid>
        </Grid>
    );
}

export default ApproveContent;