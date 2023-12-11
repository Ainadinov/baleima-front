import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function createData(name, buy, sell, profit) {
  return { name, buy, sell, profit};
}

const rows = [
  createData(50, 159, 6.0, 24),
  createData(50, 237, 9.0, 37),
  createData(50, 262, 16.0, 24),
  createData(50, 305, 3.7, 67),
  createData(50, 356, 16.0, 49),
];

const DenseTable = () => {
    const tableContainerStyle = {
        display: 'flex',
        
        justifyContent: 'flex-end',
        maxWidth: 350,
        maxHeight: 600,
    };

    const tableHeadStyle = {
        backgroundColor: '#eeecec',
    };

    const tableCellHeadStyle = {
        color: 'black',
    };
    

  return (
    <TableContainer component={Paper} style={tableContainerStyle}>
      <Table aria-label="simple table">
        <TableHead style={tableHeadStyle}>
          <TableRow>
            <TableCell  style={tableCellHeadStyle}>Количество</TableCell>
            <TableCell align="right" style={tableCellHeadStyle}>Byu</TableCell>
            <TableCell align="right" style={tableCellHeadStyle}>Sell</TableCell>
            <TableCell align="right" style={tableCellHeadStyle}>Profit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.buy}</TableCell>
              <TableCell align="right">{row.sell}</TableCell>
              <TableCell align="right">{row.profit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default DenseTable