import { Box, Typography } from '@mui/material'
import React from 'react'

export default function MyLogo({tMax = 28, tMin = 16}) {
    return (
        <Box display={'flex'}>
            <Typography variant="h5" color={'white'} sx={{ fontWeight: 650, fontSize: { xs: tMin, sm: tMin, md: tMax, lg: tMax } }} >CARCLINIC </Typography>
            <Typography variant="h5"  color='primary' sx={{ fontWeight: 650, ml: 1, fontSize: { xs: tMin, sm: tMin, md: tMax, lg: tMax } }}> FIX</Typography>
        </Box>
    )
}
