'use client'

import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button, Card, CardContent, CardHeader, CardMedia, Container, InputAdornment, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';
import Link from 'next/link';
import Utils from '@/utils/Utils';
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';

export default function DiagramsSelect() {

    function createData(name, calories, fat, carbs, protein, price) {
        return {
            name,
            calories,
            fat,
            carbs,
            protein,
            price,
            history: [
                {
                    date: '2020-01-05',
                    customerId: '11091700',
                    amount: 3,
                },
                {
                    date: '2020-01-02',
                    customerId: 'Anonymous',
                    amount: 1,
                },
            ],
        };
    }

    function Row(props) {
        const { row } = props;
        const [open, setOpen] = React.useState(false);

        return (
            <React.Fragment>
                <TableRow sx={{ '& > *': {} }} onClick={() => setOpen(!open)}>

                    <TableCell component="th" scope="row" >
                        <Typography sx={{ fontSize: 14, ml: 1 }}>
                            {row.name}
                        </Typography>

                    </TableCell>
                    {/* <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                     */}
                    {/* <TableCell align="right" sx={{ display: { xs: 'none', xl: 'block' } }}>2</TableCell> */}
                    <TableCell align="right">
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
                                <Box display={'flex'} sx={{ mx: { xs: 2, xl: 4 }, mt: 2 }} alignItems={'center'}>
                                    <CandlestickChartIcon size={'small'} sx={{color: Utils.secondaryColor}}/>
                                    <Link href={'/hh'}  style={{marginLeft: 8}}>Exterior Lights - Backup Lamps Circuit</Link>
                                </Box>
                                <Box display={'flex'} sx={{ mx: { xs: 2, xl: 4 }, mt: 2 }} alignItems={'center'}>
                                    <CandlestickChartIcon size={'small'} sx={{color: Utils.secondaryColor}}/>
                                    <Link href={'#'} style={{marginLeft: 8}}>Exterior Lights - Exterior Lamps Circuit</Link>
                                </Box>
                                <Box display={'flex'} sx={{ mx: { xs: 2, xl: 4 }, mt: 2 }} alignItems={'center'}>
                                    <CandlestickChartIcon size={'small'} sx={{color: Utils.secondaryColor}}/>
                                    <Link href={'#'} style={{marginLeft: 8}}>Exterior Lights - Trailer Tow Circuit</Link>
                                </Box>
                                <Box display={'flex'} sx={{ mx: { xs: 2, xl: 4 }, mt: 2 }} alignItems={'center'}>
                                    <CandlestickChartIcon size={'small'} sx={{color: Utils.secondaryColor}}/>
                                    <Link href={'#'} style={{marginLeft: 8}}>Interior Lights - Courtesy Lamps Circuit</Link>
                                </Box>
                                <Box display={'flex'} sx={{ mx: { xs: 2, xl: 4 }, mt: 2 }} alignItems={'center'}>
                                    <CandlestickChartIcon size={'small'} sx={{color: Utils.secondaryColor}}/>
                                    <Link href={'#'}  style={{marginLeft: 8}}>Interior Lights - Instrument Illumination Circuit</Link>
                                </Box>
                            </Box>

                        </Collapse>
                    </TableCell>

                </TableRow>
                {/* <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    History
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Customer</TableCell>
                                            <TableCell align="right">Amount</TableCell>
                                            <TableCell align="right">Total price ($)</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row.history.map((historyRow) => (
                                            <TableRow key={historyRow.date}>
                                                <TableCell component="th" scope="row">
                                                    {historyRow.date}
                                                </TableCell>
                                                <TableCell>{historyRow.customerId}</TableCell>
                                                <TableCell align="right">{historyRow.amount}</TableCell>
                                                <TableCell align="right">
                                                    {Math.round(historyRow.amount * row.price * 100) / 100}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow> */}
            </React.Fragment>
        );
    }

    Row.propTypes = {
        row: PropTypes.shape({
            calories: PropTypes.number.isRequired,
            carbs: PropTypes.number.isRequired,
            fat: PropTypes.number.isRequired,
            history: PropTypes.arrayOf(
                PropTypes.shape({
                    amount: PropTypes.number.isRequired,
                    customerId: PropTypes.string.isRequired,
                    date: PropTypes.string.isRequired,
                }),
            ).isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            protein: PropTypes.number.isRequired,
        }).isRequired,
    };

    const rows = [
        createData('Lighting and Horns', 159, 6.0, 24, 4.0, 3.99),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
        createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
        createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
        createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
    ];

    return (

        <Box>
            <Container maxWidth={'xl'} sx={{ my: 4 }}>
                <Box >

                    <Box display={'flex'} sx={{ mt: 2, mb: {xs: 2, xl: 4} }}>
                        <Box flexGrow={1}>
                            <Typography variant='h6' sx={{fontSize: {xs: 18}}} >2022 Audi A4 Quattro Sedan 40 (8WC)</Typography>
                            <Typography fontSize={14} sx={{mt: 0.5}}>L4-2.0L Turbo (DMSA) MHEV</Typography>
                        </Box>


                        <Button variant='contained' sx={{height: 44, display: {xs: 'none', xl: 'block'}}}>Change Vehicle</Button>
                        <IconButton sx={{display: {xs: 'block', xl: 'none'}}}>
                            <PublishedWithChangesOutlinedIcon size={'large'}/>
                        </IconButton>
                    </Box>

                    <Card elevation={0} sx={{ boxShadow: '0 12px 15px -5px rgba(0, 0, 0, .1)' }}>

                        <Box sx={{ px: {xs: 0, xl: 2}, py: 2 }}>
                            <TextField size='small' fullWidth placeholder='search' InputProps={{ endAdornment: (<InputAdornment position="end"   ><IconButton ><Search /></IconButton></InputAdornment>) }} />

                        </Box>

                        <TableContainer component={Paper} elevation={0}>
                            <Table aria-label="collapsible table">
                                <TableHead>
                                    <TableRow>

                                        <TableCell><Typography sx={{ fontWeight: 600 }}>Diagrams</Typography></TableCell>
                                        {/* <TableCell align="right" sx={{ display: { xs: 'none', xl: 'block' } }}><Typography sx={{ fontWeight: 600 }}>Count</Typography></TableCell> */}
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

                    </Card>

                </Box>
            </Container>
        </Box>
    )
}
