'use client'

import { Box, Collapse, IconButton, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import ListBottomSheet from '@/widgets/diagram/components/ListBottomSheet';



export default function ComponentCheckTable({ rows }) {
    const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const [btmData, setBtmData] = useState(null);
    
    const handleRowClick = (index) => {
        if(isSmallScreen){
            setBtmData(rows[index])
        }
    };

    console.log(rows, typeof rows)


    return (
        <>

            <ListBottomSheet btmData={btmData} setBtmData={setBtmData}/>
            <TableContainer component={Paper} sx={{ mt: 0 }} >
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            
                            <TableCell><strong>Component Pin</strong></TableCell>
                            <TableCell align="center"><strong>ECM Pin</strong></TableCell>
                            {!isSmallScreen && (
                                <>
                                    <TableCell align="center"><strong>Condition</strong></TableCell>
                                    <TableCell align="center"><strong>Typical Value</strong></TableCell>
                                    <TableCell align='center'><strong>Connected</strong></TableCell>
                                    <TableCell align="center"><strong>Note</strong></TableCell>
                                </>
                            )}

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows && rows.rows && rows.rows.map((row, index) => (
                            <>
                                <React.Fragment key={row.title}>
                                    <TableRow onClick={() => handleRowClick(index)}>
                                        

                                        <TableCell align="center">{row.componentPin}</TableCell>
                                        <TableCell align="center">{row.ecmPin}</TableCell>

                                        {!isSmallScreen && (
                                            <>
                                                <TableCell align="center">{row.condition}</TableCell>
                                                <TableCell align="center">{row.typicalValue}</TableCell>
                                                <TableCell align="center">{row.connected ? 'Connected' : 'Not Connected'}</TableCell>
                                                <TableCell align="center">{row.note ? row.note.replace(/<\/?[^>]+(>|$)/g, "") : ''} </TableCell>
                                            </>
                                        )}

                                    </TableRow>

                                    
                                </React.Fragment>
                            </>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>

    )
}
