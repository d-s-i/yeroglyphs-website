import * as React from 'react';
import { useRouter } from 'next/router';

import { ethers } from "ethers";
import { shortenAddress } from '../../helpers/functions';
import GoldButtonOutlined from './Buttons/GoldButtonOutlined';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useAuthContext } from '../../store/authContext';
import { getMarketplace } from '../../ethereum/marketplace';

interface TableProps {
  titles: any[];
  rows: any[];
}

export default function BasicTable(tableProps: TableProps) {

  const [isOfferMaker, setIsOfferMaker] = React.useState<boolean[]>([]);

  const authContext = useAuthContext();
  const router = useRouter();

  const { tokenId, nftAddress } = router.query;

  React.useEffect(() => {
    function getMakerAddress() {
      const signerAddress = authContext.signerAddress; 
      const _isOfferMaker = tableProps.rows.map(row => {
        if(signerAddress === row.creator && signerAddress !== "" && row.creator !== "") {
          console.log("setting true for owner offer ");
          return true;
        }
        return false;
      });

      setIsOfferMaker(_isOfferMaker);
    }

    getMakerAddress();
  }, [authContext.signerAddress, tableProps.rows]);

  async function cancelOffer() {
    const marketplace = await getMarketplace();

    try {
      if(tokenId && nftAddress) {
        await marketplace.cancelOffer(nftAddress, tokenId);
      } else {
        throw new Error("No tokenId or NFT targeted");
      }
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <TableContainer component={Paper} sx={{ backgroundColor: "#0d0d0d" }}>
      <Table aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            {tableProps.titles.map(row =>  <TableCell key={row} sx={{ color: "#f3f4f6" }}>{row}</TableCell>)}
            <TableCell sx={{ color: "#f3f4f6" }}>{isOfferMaker.includes(true) ? "Actions" : ""}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableProps.rows.map((row, i) => {
            return (<TableRow
              key={row.range}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th"scope="row" sx={{ color: "#f3f4f6" }}>{`${row.price ? ethers.utils.formatEther(row.price) : ""} wETH`}</TableCell>
              <TableCell component="th" scope="row" sx={{ color: "#f3f4f6" }}>{row.dateDeadline}</TableCell>
              <TableCell component="th" scope="row" sx={{ color: "#f3f4f6" }}>{shortenAddress(row.creator)}</TableCell>
                <TableCell component="th" scope="row" sx={{ color: "#f3f4f6" }}>
                  {isOfferMaker[i] ? <GoldButtonOutlined onClick={cancelOffer}>Cancel Offer</GoldButtonOutlined> : ""}
                </TableCell>
            </TableRow>);
            
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}