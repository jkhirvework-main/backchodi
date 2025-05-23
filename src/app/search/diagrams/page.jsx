

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
import prisma from '@/utils/db/db';
import ModuleList from './components/ModuleList';




export default async function DiagramsSelect({ searchParams }) {

    let { parId, title, engine: engineName } = searchParams;
    const modules = await prisma.module.findMany({ where: { parId }, include: { SubModules: true } });


    return (

        <Box>
            <Container maxWidth={'xl'} sx={{ my: 4 }}>
                <Box >

                    <Box display={'flex'} sx={{ mt: 2, mb: { xs: 2, xl: 4 } }}>
                        <Box flexGrow={1}>
                            <Typography variant='h6' sx={{ fontSize: { xs: 18, xl: 18 } }} >{title}</Typography>
                            <Typography fontSize={14} sx={{ mt: 0.5 }}>{engineName}</Typography>
                        </Box>


                        <Button variant='contained' sx={{ height: 44, display: { xs: 'none', xl: 'block' } }}>Change Vehicle</Button>
                        <IconButton sx={{ display: { xs: 'block', xl: 'none' } }}>
                            <PublishedWithChangesOutlinedIcon size={'large'} />
                        </IconButton>
                    </Box>



                    <Card elevation={0} variant='outlined' sx={{ mt: 4, borderRadius: 2 }}>

                        <CardHeader title={'Diagrams'} sx={{ bgcolor: Utils.secondaryColor, color: 'white' }} />

                        <ModuleList rows={modules} title={title} engineName={engineName}
                        />
                    </Card>

                </Box>
            </Container>
        </Box>
    )
}
