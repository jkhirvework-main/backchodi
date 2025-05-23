'use client'

import Utils from '@/utils/Utils'
import { Search } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Box, Card, CardHeader, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import MyExpandableTable from '../MyExpandableTable'
import Image from 'next/image'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ImageComponent = ({ title, src, mt= 4, width = 1114, height = 208 }) => {
    return (
        <Box sx={{ mt }}>
            <Accordion variant='outlined'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"

                >
                    <Typography variant='h6'>{title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box display={'flex'} justifyContent={'center'} justifyItems={'center'}>
                        <Image src={src} width={width} height={height} layout='intrinsic' />
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}

const preData = [{
    component: 'Accelerator Position Sensor',
    ecm_pin: 'K8',
    signal: 'Arc',
    condition: 'Ignition On',
    typical_value: '0V',
    oscilloscope_setting: '10 V/2 ms',
    view: ''
}, {
    component: 'CK Position Sensor',
    ecm_pin: 'K22',
    signal: 'Arc',
    condition: 'Ignition On',
    typical_value: '0V',
    oscilloscope_setting: '10 V/2 ms',
    view: ''
}, {
    component: 'Fuel Injection Sensor',
    ecm_pin: 'K54',
    signal: 'Arc',
    condition: 'Ignition On',
    typical_value: '0V',
    oscilloscope_setting: '10 V/2 ms',
    view: ''
}, {
    component: 'APP Sensor',
    ecm_pin: 'K12',
    signal: 'Arc',
    condition: 'Ignition On',
    typical_value: '0V',
    oscilloscope_setting: '10 V/2 ms',
    view: ''
}]

export default function PinOutSection() {
    const [rows, setRows] = useState(preData);
    const [search, setSearch] = useState('');


    const handlerSearch = (e) => {
        const { value } = e.target;
        setSearch(value);

        if (value === '') {
            setRows(preData);
        } else {
            setRows(preData.filter(row => row.component.toLocaleLowerCase().startsWith(value.toLocaleLowerCase())));
        }
    }

    return (
        <>
            <ImageComponent title={'Terminal Side'} src={'/diagrams/pinout.png'} />
            <ImageComponent title={'Wire Side'} src={'/diagrams/pinout.png'} mt={2}/>

            <Card elevation={0} variant='outlined' sx={{ mt: 4, borderRadius: 2, mb: 8 }}>
                <CardHeader title={'PinOuts'} sx={{ bgcolor: Utils.secondaryColor }} />

                <Box sx={{ px: { xs: 2, xl: 2 }, py: 2 }}>
                    <TextField onChange={handlerSearch} value={search} size='small' fullWidth placeholder='search' InputProps={{ endAdornment: (<InputAdornment position="end"   ><IconButton ><Search /></IconButton></InputAdornment>) }} />
                </Box>

                <MyExpandableTable rows={rows} />

                
            </Card>
        </>
    )
}
