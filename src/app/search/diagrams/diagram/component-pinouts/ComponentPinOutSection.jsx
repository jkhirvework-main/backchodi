'use client'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Card, CardHeader, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { Search } from '@mui/icons-material'
import ComponentPinoutExpandableView from './ComponentPinoutExpandableView';
import { useState } from 'react';
import Utils from '@/utils/Utils';
import Image from 'next/image';

const ImageComponent = ({ title, src, mt = 4, width = 1114, height = 208 }) => {
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

export default function ComponentPinOutSection({preData}) {
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
        <Box>
            <ImageComponent title={'Terminal Side'} src={'/diagrams/pinout.png'} />
            <ImageComponent title={'Wire Side'} src={'/diagrams/pinout.png'} mt={2} />

            <Card elevation={0} variant='outlined' sx={{ mt: 4, borderRadius: 2, mb: 8 }}>
                <CardHeader title={'PinOuts'} sx={{ bgcolor: Utils.secondaryColor }} />

                <Box sx={{ px: { xs: 2, xl: 2 }, py: 2 }}>
                    <TextField onChange={handlerSearch} value={search} size='small' fullWidth placeholder='search' InputProps={{ endAdornment: (<InputAdornment position="end"   ><IconButton ><Search /></IconButton></InputAdornment>) }} />
                </Box>

                <ComponentPinoutExpandableView rows={rows} />
            </Card>
        </Box>
    )
}
