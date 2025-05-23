'use client'

import {  Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import ListBottomSheet from '@/widgets/diagram/components/ListBottomSheet';
import Utils from '@/utils/Utils';

export default function ComponentPinoutExpandableView({ rows }) {
  const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const [btmData, setBtmData] = useState(null);


  const handleRowClick = (index) => {
    // setOpenRowIndex(openRowIndex === index ? null : index);

    if (isSmallScreen) {
      setBtmData(rows[index])
    }
  };



  return (
    <>
      <ListBottomSheet btmData={btmData} setBtmData={setBtmData} type='pinOuts'/>
      <TableContainer component={Paper} sx={{ mt: 0 }} >
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              {/* {isSmallScreen && (
              <TableCell>
              </TableCell>
            )} */}

              <TableCell align="center"><strong>Component Pin</strong></TableCell>
              <TableCell align="center"><strong>ECM Pin</strong></TableCell>
              {!isSmallScreen && (
              <>
                <TableCell align="center"><strong>Type</strong></TableCell>
                {/* <TableCell align="center"><strong>View</strong></TableCell> */}
              </>
            )}

            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <>
                <React.Fragment key={row.title}>
                  <TableRow onClick={() => handleRowClick(index)}>
                    {/* {isSmallScreen && (
                      <TableCell >
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() => handleRowClick(index)}
                        >
                          {openRowIndex === index ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </IconButton>
                      </TableCell>
                    )} */}

                    <TableCell align="center">{row.compPinNum}</TableCell>
                    <TableCell align="center">{row.ecmPinNum}</TableCell>

                    {!isSmallScreen && (
                    <>
                      <TableCell align="center">{row.type}</TableCell>
                      
                      {/* <TableCell align="center"><Link underline='none' sx={{color: Utils.primaryColor}} href={'#'}>View</Link> </TableCell> */}
                    </>
                  )}

                  </TableRow>
                  {/* 
                {isSmallScreen && (
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                      <Collapse in={openRowIndex === index} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                          <Typography variant="body1" sx={{py: 0.2, mt: 2}} gutterBottom component="div">
                            <strong>Signal:</strong> {row.signal}
                          </Typography>
                          <Typography variant="body1" sx={{py: 0.2}} gutterBottom component="div">
                            <strong>Condition:</strong> {row.condition}
                          </Typography>
                          <Typography variant="body1" sx={{py: 0.2}} gutterBottom component="div">
                            <strong>Typical Value:</strong> {row.typical_value}
                          </Typography>
                          <Typography variant="body1" sx={{py: 0.2}} gutterBottom component="div">
                            <strong>Oscilloscope Setting:</strong> {row.oscilloscope_setting}
                          </Typography>
                          <Typography variant="body1" sx={{py: 0.5}} gutterBottom component="div">
                            <strong>View:</strong> <Link underline='none' sx={{color: Utils.primaryColor}} href={'#'}>View</Link>
                          </Typography>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                )} */}
                </React.Fragment>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>

  )
}
