'use client'

import Utils from '@/utils/Utils';
import { Box, Drawer, Typography } from '@mui/material';
import React from 'react'


export default function ListBottomSheet({ btmData, setBtmData, type = 'checks' }) {

    const checks = ['Component', 'ECM Pin', 'Condition', 'Typical Value', 'Connected', 'Reverse', 'Note'];
    const pinOuts = ['Component', 'ECM Pin', 'Signal', 'Condition', 'Typical Value', 'Oscilloscope Setting', 'View in Diagram']

    const types = {
        checks: checks,
        pinOuts: pinOuts
    }

    const BtmRow = ({ value, index}) => {
        return (
            <>
                <Typography  fontWeight={600}>{types[type][index]}</Typography>
                <Typography sx={{mt: 0.5, mb: 2}} color={'gray'}>{value}</Typography>
            </>
        );
    }

    return (
        <>
            <Drawer
                anchor={'bottom'}
                open={btmData != null}
                onClose={() => setBtmData(null)}
                PaperProps={{ square: false, sx: { borderTopLeftRadius: 12, borderTopRightRadius: 12 } }}
            >


                <Box sx={{ py: 4, px: 3 }}>
                    {btmData && Object.entries(btmData).map(([key, value], index) => (
                        <Box key={Utils.getNanoId()}>
                            <BtmRow  value={value} index={index}/>
                        </Box>
                    ))}
                </Box>

            </Drawer>
        </>
    )
}
