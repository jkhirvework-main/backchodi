'use client'

import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Collapse, IconButton, Box, Typography, useMediaQuery, useTheme
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

function ExpandableTable() {
  const [openRowIndex, setOpenRowIndex] = useState(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleRowClick = (index) => {
    setOpenRowIndex(openRowIndex === index ? null : index);
  };

  const rows = [
    { name: 'Item 1', detail: 'Detail about Item 1', otherInfo: 'Other Info 1' },
    { name: 'Item 2', detail: 'Detail about Item 2', otherInfo: 'Other Info 2' },
    { name: 'Item 3', detail: 'Detail about Item 3', otherInfo: 'Other Info 3' },
  ];

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            {/* {!isSmallScreen && (
              <>
                <TableCell>Detail</TableCell>
                <TableCell>Other Info</TableCell>
              </>
            )} */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <React.Fragment key={row.name}>
              <TableRow onClick={() => handleRowClick(index)}>
                {/* <TableCell>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => handleRowClick(index)}
                  >
                    {openRowIndex === index ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                  </IconButton>
                </TableCell> */}
                <TableCell>{row.name}</TableCell>
                {!isSmallScreen && (
                  <>
                    <TableCell>{row.detail}</TableCell>
                    <TableCell>{row.otherInfo}</TableCell>
                  </>
                )}
              </TableRow>
              {/* {isSmallScreen && (
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={openRowIndex === index} timeout="auto" unmountOnExit>
                      <Box margin={1}>
                        <Typography variant="body1" gutterBottom component="div">
                          <strong>Detail:</strong> {row.detail}
                        </Typography>
                        <Typography variant="body1" gutterBottom component="div">
                          <strong>Other Info:</strong> {row.otherInfo}
                        </Typography>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              )} */}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ExpandableTable;
