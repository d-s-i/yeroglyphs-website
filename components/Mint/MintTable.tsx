import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
    range: string,
    price: string,
  ) {
    return { range, price };
  }
  
const rows = [
    createData('1 - 30', "0.060606 ether"),
    createData('31 - 50', "0.090909 ether"),
    createData('51 - 432', "0.1010101 ether"),
    createData('433 - 483', "0.1212121 ether"),
    createData('483 - 512', "0.1313131 ether"),
];

export default function MintTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table" size="small">
        <TableHead sx={{ backgroundColor: "#ffd700" }}>
          <TableRow>
            <TableCell>TokenId</TableCell>
            <TableCell align="right">Prices</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow
              key={rows[0].range}
              sx={{ backgroundColor: "#fffbe6", '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{rows[0].range}</TableCell>
              <TableCell align="right">{rows[0].price}</TableCell>
            </TableRow>
            <TableRow
              key={rows[1].range}
              sx={{ backgroundColor: "#fff4b3", '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{rows[1].range}</TableCell>
              <TableCell align="right">{rows[1].price}</TableCell>
            </TableRow>
            <TableRow
              key={rows[2].range}
              sx={{ backgroundColor: "#ffe866", '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{rows[2].range}</TableCell>
              <TableCell align="right">{rows[2].price}</TableCell>
            </TableRow>
            <TableRow
              key={rows[3].range}
              sx={{ backgroundColor: "#fff4b3", '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{rows[3].range}</TableCell>
              <TableCell align="right">{rows[3].price}</TableCell>
            </TableRow>
            <TableRow
              key={rows[4].range}
              sx={{ backgroundColor: "#fffbe6", '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{rows[4].range}</TableCell>
              <TableCell align="right">{rows[4].price}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}