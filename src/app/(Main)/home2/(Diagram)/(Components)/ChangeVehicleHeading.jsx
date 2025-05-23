import Utils from '@/utils/Utils';
import { Box, Button, IconButton, Link, Typography } from '@mui/material'
import React from 'react'

export default function ChangeVehicleHeading({ configOem }) {



    return (
        <Box display={'flex'} sx={{  mb: { xs: 2, xl: 4 } }}>
            <Box flexGrow={1} sx={{mt:3, mb: { xs: 2, xl: 4 }}}>
                <Typography variant='h6' sx={{ fontSize: { xs: 18, xl: 18 } }} >{configOem?.oem?.name + ' ' + configOem?.model?.name}</Typography>
                <Typography fontSize={14} sx={{ mt: 0.5 }}>{configOem?.year + ' - ' + configOem?.engine?.name}</Typography>
            </Box>

            <Box sx={{mt: 3, mb: { xs: 2, xl: 4 }}}>
            <Button  variant='outlined' component={Link} href='/home2' sx={{ height: 42,  }}>Change Vehicle</Button>
            </Box>
            
        </Box>
    )
}
