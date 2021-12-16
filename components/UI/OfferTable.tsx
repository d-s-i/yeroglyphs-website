import * as React from 'react';

import { shortenAddress } from '../../helpers/functions';
import { ethers } from "ethers";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface TableProps {
  titles: any[];
  rows: any[];
}

export default function BasicTable(tableProps: TableProps) {

  return (
    <TableContainer component={Paper} sx={{ backgroundColor: "#0d0d0d" }}>
      <Table aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            {tableProps.titles.map(row =>  <TableCell sx={{ color: "#f3f4f6" }}>{row}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableProps.rows.map((row) => (
            <TableRow
              key={row.range}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th"scope="row" sx={{ color: "#f3f4f6" }}>{`${ethers.utils.formatEther(row.price)} wETH`}</TableCell>
              <TableCell component="th" scope="row" sx={{ color: "#f3f4f6" }}>{row.dateDeadline}</TableCell>
              <TableCell component="th" scope="row" sx={{ color: "#f3f4f6" }}>{shortenAddress(row.creator)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}