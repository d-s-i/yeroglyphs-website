import React from "react";

import { ethers, BigNumber } from "ethers";
import ERC721ABI from "../../ethereum/abis/ERC721ABI.json"
import { getWeth } from "../../ethereum/weth";
import { getMarketplace, marketplaceAddress } from "../../ethereum/marketplace";
import { getIsNftApproved } from "../../helpers/functions";
import { useAuthContext } from "../../store/authContext";

import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import ModalContainer from "../UI/Modals/ModalContainer";
import ApproveContent from "./ApproveContent/ApproveContent";
import SellNftContent from "./SellNftContent/SellNftContent";
import { goldColor } from "../../helpers/constant";

import styles from "./SellNftModal.module.css";
import { RedoOutlined } from "@mui/icons-material";

interface Props {
    nftAddress: string | string[] | undefined;
    onCloseModal: (event: React.MouseEvent) => void;   
}

function SellNftModal(props: Props) {

    const [needAllowance, setNeedAllowance] = React.useState<boolean>(false);
    
    const authContext = useAuthContext();

    React.useEffect(() => {
        async function getApproval() {
            const signer = authContext.signer;
            if(!signer) return;
            if(typeof(props.nftAddress) !== "string") return;
            const isApprovedForAll = await getIsNftApproved(props.nftAddress, true, marketplaceAddress, signer);

            if(!isApprovedForAll) {
                setNeedAllowance(true);
                return;
            }

            setNeedAllowance(false);
        }

        getApproval();
    }, []);

    function changeNeedAllowance(_needApproval: boolean) {
        setNeedAllowance(_needApproval);
    }
    
    return(
        <div className={styles.backdrop}>
            <ModalContainer>
                <Container maxWidth="md" sx={{
                    display: "flex",
                    justifyContent: "center",
                    position: "fixed",
                    backgroundColor: "black",
                    borderRadius: "14px",
                    zIndex: "30",
                    top:"30%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    boxShadow: `0px 0px 5px ${goldColor}`,
                }}>
                    <Grid container sx={{ padding: "1% 0% 1% 3%", height: "100%" }}>
                        <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                            <IconButton aria-label="close" size="small" onClick={props.onCloseModal}>
                                <CloseIcon fontSize="inherit" color="primary" />
                            </IconButton>
                        </Grid>
                        <Grid item xs={12}>
                            {needAllowance && <ApproveContent approveWhat="nft" nftAddress={props.nftAddress} onApproving={changeNeedAllowance} />}
                            {!needAllowance && <SellNftContent />}
                        </Grid>
                    </Grid>
                </Container>
            </ModalContainer>
        </div>
    );
}

export default SellNftModal;