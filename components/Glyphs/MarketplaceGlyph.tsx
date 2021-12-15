import React from "react";
import Router, { useRouter } from 'next/router';

import { ethers } from "ethers";
import { getMarketplace } from "../../ethereum/marketplace";
import { yeroglyphsAddress } from "../../ethereum/yeroglyphs";

import Image from "next/image";
import Typography from "@mui/material/Typography";
import LoadingButton from '@mui/lab/LoadingButton';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

import styles from "./DisplayGlyph.module.css";
import { goldColor } from "../../helpers/constant";

interface Props {
  src: string;
  id: string;
  isGenesis?: boolean;
  isDynamic: boolean;
  onSaveNft?: (id: any) => Promise<void>;
  index?: { isTrue: boolean, value: number };
}

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    backgroundColor: "white",
    borderRadius: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  }));

function MarketplaceGlyph(props: Props) {

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const router = useRouter();

  async function onClicking(id:string, price: number) {
    setIsLoading(true);
    try {
        const marketplace = await getMarketplace();
        await marketplace.createMarketItem(yeroglyphsAddress, id, ethers.utils.parseEther(price.toString()));
    } catch(error) {
        console.log(error);
    }
    setIsLoading(false);
  }
  
    return (
        <Box
            sx={{
            width: 320,
            backgroundColor: "black",
            borderRadius: "5px",
            }}
        >
            <Grid item xs={12}>
                <Item sx={{ "&:hover": {
                    backgroundColor: "hsl(0, 0%, 95%)",
                    cursor: "pointer"
                    }}}
                >
                    <Image src={props.src} alt={`yero-${props.id}`} width="320" height="320" />
                </Item>
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: "3%" }}>
                <Typography sx={{ marginTop: "5%", marginBottom: "5%", color: "#e6e6e6" }} variant="h6" component="p" align="center">
                    {props.isGenesis ? <span style={{ color: goldColor }}>{`Genesis Yero #${props.id}`}</span> :  `Yero #${props.id}`}
                </Typography>
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                <LoadingButton
                    sx={{color: "#FFD700", borderColor: "#FFD700", marginBottom: "3%", "&:hover": {borderColor: "#FFD700", backgroundColor: "rgb(201, 19, 195, 0.04)"}}}
                    onClick={() => router.push(`/marketplace/${yeroglyphsAddress}/${props.id}`)}
                    loading={isLoading}
                    variant="outlined"
                >
                    List
                </LoadingButton>
            </Grid>
        </Box>
    )
}

export default MarketplaceGlyph;
