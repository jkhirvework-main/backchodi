'use client'

import {  Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import ListBottomSheet from '@/widgets/diagram/components/ListBottomSheet';
import Utils from '@/utils/Utils';

export default function MyExpandableTable({ rows }) {
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

              <TableCell><strong>Component</strong></TableCell>
              <TableCell align="center"><strong>ECM Pin</strong></TableCell>
              {!isSmallScreen && (
              <>
                <TableCell align="center"><strong>Signal</strong></TableCell>
                <TableCell align="center"><strong>Condition</strong></TableCell>
                <TableCell align="center"><strong>Typical Value</strong></TableCell>
                <TableCell align="center"><strong>Oscilloscope Setting</strong></TableCell>
                <TableCell align="center"><strong>View</strong></TableCell>
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

                    <TableCell>{row.component}</TableCell>
                    <TableCell align="center">{row.ecm_pin}</TableCell>

                    {!isSmallScreen && (
                    <>
                      <TableCell align="center">{row.signal}</TableCell>
                      <TableCell align="center">{row.condition}</TableCell>
                      <TableCell align="center">{row.typical_value}</TableCell>
                      <TableCell align="center">{row.oscilloscope_setting}</TableCell>
                      <TableCell align="center"><Link underline='none' sx={{color: Utils.primaryColor}} href={'#'}>View</Link> </TableCell>
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
