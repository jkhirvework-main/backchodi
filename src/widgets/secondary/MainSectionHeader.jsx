import { Box, Typography } from '@mui/material'
import { Montserrat } from 'next/font/google';
import React from 'react'

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400']
});


export default function MainSectionHeader(props) {
    return (
        <Box sx={{pt: 6, pb: 4}}>
            <Typography className={montserrat.className} sx={{ textAlign: 'center', fontWeight: 300, fontSize: { xs: 24, sm: 24, md: '1.875rem', lg: '1.875rem' } }}>{props.title}</Typography>
            <Typography sx={{ mt: 2, textAlign: 'center' }} color={'#ababab'} >{props.subTitle}</Typography>

            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} alignContent={'center'} sx={{ mt: 1 }}>
                <Box sx={{ height: 2, width: 80, backgroundColor: '#006AD3' }}></Box>
            </Box>
        </Box>
    )
}
