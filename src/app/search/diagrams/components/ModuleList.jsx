'use client'

import { Box, Collapse, IconButton, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';
import Link from 'next/link';
import { Search } from '@mui/icons-material';
import Utils from '@/utils/Utils';
import { saveHistory } from '@/app/actions/searchActions';

export default function ModuleList({ rows, title, engineName }) {

    function Row(props) {
        const { row } = props;
        const [open, setOpen] = React.useState(false);

        const clickHandler = async (subModuleId) => {
            const data = await saveHistory('wiring-diagram', title, engineName, {subModuleId, moduleName: row.name});
           
        }

        return (
            <>
                <TableRow sx={{ '& > *': {} }} onClick={() => setOpen(!open)}>

                    <TableCell component="th" scope="row" sx={{ borderBottom: "none" }}>
                        <Typography sx={{ fontSize: 14, ml: { xl: 1, xs: 0 } }}>
                            {row.name}
                        </Typography>

                    </TableCell>
                    <TableCell align="right" sx={{ borderBottom: "none" }}>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                </TableRow>

                <TableRow style={{ paddingBottom: 0, paddingTop: 0 }} >
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ pb: 4, color: Utils.primaryColor }}>

                                {row.SubModules.map((subModule, index) => {
                                    return (
                                        <Box key={index} display={'flex'} sx={{ mx: { xs: 0, xl: 4 }, mt: 2 }} alignItems={'center'}>
                                            <CandlestickChartIcon size={'small'} sx={{ color: Utils.secondaryColor }} />
                                            <Link onClick={() => clickHandler(subModule.id)} href={'/search/diagrams/diagram?parId='+subModule.id} style={{ marginLeft: 8 }}>{subModule.name}</Link>
                                        </Box>
                                    )
                                })}

                            </Box>

                        </Collapse>
                    </TableCell>

                </TableRow>
            </>
        );
    }


    return (
        <>
            <Box sx={{ px: { xs: 2, xl: 2 }, py: 2 }}>
                <TextField size='small' fullWidth placeholder='search' InputProps={{ endAdornment: (<InputAdornment position="end"   ><IconButton ><Search /></IconButton></InputAdornment>) }} />
            </Box>

            <TableContainer component={Paper} elevation={0} sx={{ px: 2 }}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>

                            <TableCell><Typography sx={{ fontWeight: 600 }}>Diagrams</Typography></TableCell>
                            <TableCell align="right" ><Typography sx={{ fontWeight: 600 }}>Actions</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <Row key={row.name} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
