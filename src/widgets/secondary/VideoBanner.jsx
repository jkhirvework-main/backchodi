'use client'

import React, { useState } from 'react'
import RSeperator from './RSeperator'
import TurnedInNotOutlinedIcon from '@mui/icons-material/TurnedInNotOutlined';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

export default function VideoBanner({ heading, thumbnail, views, date }) {
    const [headingColor, setHeadingColor] = useState('#152329')
    const mouseOverHandler = () => {
        setHeadingColor('#006AD3')
    }

    const mouseOutHandler = () => {
        setHeadingColor('#152329')
    }

    const width = 310, height = 174;

    return (
        <Box display={'flex'} justifyContent="center" justifyItems={'center'}>
            <Box style={{ width, }} onMouseOver={mouseOverHandler} onMouseOut={mouseOutHandler} >
                <div style={{ borderRadius: '8px', overflow: 'hidden', width, height }}>
                    <Image alt="" src={thumbnail ? thumbnail : '/home/images/video-banner.png'} width={width} height={height} objectFit="cover" />
                </div>

                <Typography sx={{ mt: 2, fontSize: '14px' }} color={headingColor}>{heading}</Typography>

                <Box display={'flex'} sx={{ mt: 1 }} alignContent={'center'} alignItems={'center'}>
                    <Typography color={'#ababab'} sx={{ fontSize: '14px' }}>{views ? views : 0} views</Typography>
                    <RSeperator />
                    <Typography color={'#ababab'} flexGrow={1} sx={{ fontSize: '14px' }}>Published On: {date ? date : 0}</Typography>
                    <TurnedInNotOutlinedIcon sx={{ color: '#ababab' }}></TurnedInNotOutlinedIcon>
                </Box>
            </Box>
        </Box>
    )
}
