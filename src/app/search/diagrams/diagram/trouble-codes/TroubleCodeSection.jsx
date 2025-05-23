'use client'

import { Box, Card, CardHeader, IconButton, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Utils from '@/utils/Utils';
import { Search } from '@mui/icons-material';
import { setDtcDrawer, setSingleDtcDrawer } from '@/app/GlobalRedux/slice/viewer.sclice';

export default function TroubleCodeSection({ data }) {
    const [rows, setRows] = useState(data);
    const [search, setSearch] = useState('');
    const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));


    const handlerSearch = (e) => {
        const { value } = e.target;
        setSearch(value);

        setRows(data.filter(row => row.code.toLocaleLowerCase().startsWith(value.toLocaleLowerCase())));
    }

    return (
        <Card elevation={0} variant='outlined' sx={{ mt: 4, borderRadius: 2, mb: 8 }} >
            <CardHeader title={'Trouble Codes'} sx={{ bgcolor: Utils.secondaryColor }} />

            <Box sx={{ px: { xs: 2, xl: 2 }, py: 2 }}>
                <TextField onChange={handlerSearch} value={search} size='small' fullWidth placeholder='search' InputProps={{ endAdornment: (<InputAdornment position="end"   ><IconButton ><Search /></IconButton></InputAdornment>) }} />
            </Box>

            <TableContainer component={Paper} sx={{ mt: 0 }} >
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Code</strong></TableCell>
                            {!isSmallScreen && (
                                <TableCell ><strong>Description</strong></TableCell>
                            )}
                            <TableCell align='right'><strong>View</strong></TableCell>
                        </TableRow>


                    </TableHead>
                    <TableBody >
                        {rows && rows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell >{row.code}</TableCell>

                                {!isSmallScreen && (
                                    <TableCell >{row.title}</TableCell>

                                )}

                                <TableCell align='right'>
                                    <IconButton onClick={() => {
                                        Utils.dispatch(setSingleDtcDrawer({ isOpen: true, preData: row }))
                                    }}>
                                        <NavigateNextIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>
        </Card>
    )
}
