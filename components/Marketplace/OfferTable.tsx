import * as React from 'react';
import { useRouter } from 'next/router';

import { shortenAddress } from '../../helpers/functions';
import GoldButtonOutlined from '../UI/Buttons/GoldButtonOutlined';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { ethers } from "ethers";
import { useAuthContext } from '../../store/authContext';
import { getMarketplace, marketplaceAddress } from '../../ethereum/marketplace';
import { getYeroglyphs } from '../../ethereum/yeroglyphs';
import ERC721ABI from "../../ethereum/abis/ERC721ABI.json";
import { getSignerHandler } from '../../ethereum/web3';

interface TableProps {
  titles: any[];
  rows: any[];
}


export default function OfferTable(tableProps: TableProps) {

  const [isOfferMaker, setIsOfferMaker] = React.useState<boolean[]>([]);
  const [isNftOwner, setIsNftOwner] = React.useState<boolean>(false);
  const [acceptOfferBtnText, setAcceptOfferBtnText] = React.useState<string>("Accept Offer");

  const authContext = useAuthContext();
  const router = useRouter();

  const { tokenId, nftAddress } = router.query;

  React.useEffect(() => {
    const getMakerAddress = function() {
      const signerAddress = authContext.signerAddress; 
      const _isOfferMaker = tableProps.rows.map(row => {
        if(signerAddress === row.creator && signerAddress !== "" && row.creator !== "") {
          return true;
        }
        return false;
      });

      setIsOfferMaker(_isOfferMaker);
    }

    const getOwnerAddress = async function() {
      if(typeof(nftAddress) !== "string") return;
      const signer = authContext.signer;
      const signerAddress = authContext.signerAddress;
      if(!signer) return;

      const nftContract = await new ethers.Contract(nftAddress, ERC721ABI, signer);
      const owner = await nftContract.ownerOf(tokenId);

      if(signerAddress === owner) {
        setIsNftOwner(true);
    
        const isApprovedForAll = await nftContract.isApprovedForAll(signerAddress, marketplaceAddress);
        if(!isApprovedForAll) {
          setAcceptOfferBtnText("Approve & accept");
        }
      } else {
        setIsNftOwner(false);
      }
    }

    getMakerAddress();
    getOwnerAddress();
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

  async function acceptOffer(creator: string) {
    if(typeof(nftAddress) !== "string") return;
    const marketplace = await getMarketplace();
    const signer = marketplace.signer;
    const signerAddress = await signer.getAddress();
    const nftContract = await new ethers.Contract(nftAddress, ERC721ABI, signer);

    const isApprovedForAll = await nftContract.isApprovedForAll(signerAddress, marketplace.address);

    if(!isApprovedForAll) {
      try {
        await nftContract.setApprovalForAll(marketplace.address, true);
        return;
      } catch(error) {
        console.log(error);
      }
    }

    try {
      await marketplace.acceptOffer(nftAddress, tokenId, creator);
    } catch(error) {
      console.log(error);
    }
    console.log(creator)
  }

  return (
    <TableContainer component={Paper} sx={{ backgroundColor: "#0d0d0d" }}>
      <Table aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            {tableProps.titles.map((row) =>  <TableCell key={row} sx={{ color: "#f3f4f6" }}>{row}</TableCell>)}
            <TableCell key="cell" sx={{ color: "#f3f4f6" }}>{isOfferMaker.includes(true) ? "Actions" : ""}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableProps.rows.map((row, i) => {
            return (<TableRow
              key={row.creator}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell key={`table-1-${i}`} component="th"scope="row" sx={{ color: "#f3f4f6" }}>{`${row.price ? ethers.utils.formatEther(row.price) : ""} wETH`}</TableCell>
              <TableCell key={`table-2-${i}`} component="th" scope="row" sx={{ color: "#f3f4f6" }}>{row.dateDeadline}</TableCell>
              <TableCell key={`table-3-${i}`} component="th" scope="row" sx={{ color: "#f3f4f6" }}>{shortenAddress(row.creator)}</TableCell>
              <TableCell key={`table-4-${i}`} component="th" scope="row" sx={{ color: "#f3f4f6" }}>
                {isOfferMaker[i] ? <GoldButtonOutlined onClick={cancelOffer}>Cancel Offer</GoldButtonOutlined> : ""}
                {isNftOwner ? <GoldButtonOutlined onClick={() => acceptOffer(row.creator)}>{acceptOfferBtnText}</GoldButtonOutlined> : ""}
              </TableCell>
            </TableRow>);
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}