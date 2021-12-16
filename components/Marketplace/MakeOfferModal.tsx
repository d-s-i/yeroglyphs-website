import React from "react";

import { BigNumber } from "ethers";
import { getWeth } from "../../ethereum/weth";
import { getMarketplace } from "../../ethereum/marketplace";
import { useAuthContext } from "../../store/authContext";

import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import ModalContainer from "../UI/Modals/ModalContainer";
import ApproveContent from "./ApproveContent/ApproveContent";
import MakeOfferContent from "./MakeOfferContent/MakeOfferContent";

import styles from "./MakeOfferModal.module.css";


interface Props {
    message: string;
    onCloseModal: (event: React.MouseEvent) => void;   
}

function MakeOfferModal(props: Props) {

    const [needAllowance, setNeedAllowance] = React.useState<boolean>(false);
    
    const authContext = useAuthContext();

    React.useEffect(() => {
        async function getApproval() {
            const weth = await getWeth();
            const marketplace = await getMarketplace();
            const signer = marketplace.signer;

            if(!signer) return;
            const signerAddress = authContext.signerAddress;

            const allowance = await weth.allowance(signerAddress, marketplace.address);

            if(allowance.lt(BigNumber.from(BigInt(2**20)))) {
                setNeedAllowance(true);
            } else {
                setNeedAllowance(false);
            }
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
                    color: "black",
                    borderRadius: "14px",
                    zIndex: "30",
                    top:"30%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    boxShadow: "24"
                }}>
                    <Grid container sx={{ padding: "1% 0% 1% 3%", height: "100%" }}>
                        <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <IconButton aria-label="close" size="small" onClick={props.onCloseModal}>
                            <CloseIcon fontSize="inherit" color="primary" />
                        </IconButton>
                        </Grid>
                        <Grid item xs={12}>
                            {needAllowance && <ApproveContent onApproving={changeNeedAllowance} />}
                            {!needAllowance && <MakeOfferContent />}
                        </Grid>
                    </Grid>
                </Container>
            </ModalContainer>
        </div>
    );
}

export default MakeOfferModal;