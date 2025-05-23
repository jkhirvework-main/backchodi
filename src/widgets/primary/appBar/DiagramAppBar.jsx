'use client'

import { AppBar, Box, Button, Divider, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ElectricalServicesOutlinedIcon from '@mui/icons-material/ElectricalServicesOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ElectricBoltOutlinedIcon from '@mui/icons-material/ElectricBoltOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { setDrawer } from '@/app/GlobalRedux/slice/viewer.sclice';
import Utils from '@/utils/Utils';
import WiringAnimation from '@/widgets/diagram/connection/WiringAnimation';
import DiagramSearchComponent from '@/widgets/diagram/components/DiagramSearchComponent';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


const IconWithText = () => {
    return (
        <Box>
            <Box display={'flex'} sx={{ mx: 2 }} alignItems={'center'}>
                <IconButton >
                    <SearchIcon sx={{ color: '#fff' }} />
                </IconButton>
                <Typography fontSize={14} sx={{ ml: 1, mr: 1 }}>SEARCH</Typography>
            </Box>

            <Divider orientation="vertical" flexItem sx={{ bgcolor: "secondary.light" }} />
            <Box display={'flex'} sx={{ mx: 2 }} alignItems={'center'}>
                <IconButton >
                    <ElectricBoltOutlinedIcon sx={{ color: '#fff' }} />
                </IconButton>
                <Typography fontSize={14} sx={{ ml: 1, mr: 1 }}>FLOW</Typography>
            </Box>

            <Divider orientation="vertical" flexItem sx={{ bgcolor: "secondary.light" }} />

            <Box display={'flex'} sx={{ mx: 2 }} alignItems={'center'}>
                <IconButton >
                    <ElectricalServicesOutlinedIcon sx={{ color: '#fff' }} />
                </IconButton>
                <Typography fontSize={14} sx={{ ml: 1, mr: 1 }}>HIDE WIRES</Typography>
            </Box>


            <Divider orientation="vertical" flexItem sx={{ bgcolor: "secondary.light" }} />
            <IconButton sx={{ mr: 2, ml: 2 }}>
                <RefreshOutlinedIcon sx={{ color: '#fff' }} />
            </IconButton>
            <Divider orientation="vertical" flexItem sx={{ bgcolor: "secondary.light" }} />
            <IconButton sx={{ mx: 2 }}>
                <InfoOutlinedIcon sx={{ color: '#fff' }} />
            </IconButton>
        </Box>
    );
}

const ClickableIcon = ({ onCallback, closeCallback, icon: Icon }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <IconButton sx={{ ml: { xs: 0, xl: 1 } }} onClick={() => {
            if (!isOpen) {
                onCallback(!isOpen)
            } else {
                closeCallback(!isOpen);
            }
            setIsOpen(!isOpen);
        }} >
            {<Icon sx={{ color: isOpen ? Utils.primaryColor : 'grey' }} />}
        </IconButton>
    );
}

const OnlyIcons = () => {
    return (
        <Box>
            <DiagramSearchComponent />

            <ClickableIcon icon={ElectricBoltOutlinedIcon} onCallback={(v) => WiringAnimation.startAnimate(v)} closeCallback={(v) => WiringAnimation.startAnimate(v)} />
            <ClickableIcon icon={ElectricalServicesOutlinedIcon} onCallback={() => Utils.diagramViewer.hideConnections()} closeCallback={() => Utils.diagramViewer.showConnections()} />


            <IconButton sx={{ ml: { xs: 0, xl: 1 } }} onClick={() => Utils.diagramViewer.reset()}>
                <RefreshOutlinedIcon />
            </IconButton>
            <IconButton sx={{ mr: { xs: 0, xl: 2 }, ml: { xs: 0, xl: 1 } }}>
                <InfoOutlinedIcon />
            </IconButton>
        </Box>
    );
}

export default function DiagramAppBar() {
    const router = useRouter();
    

    return (
        <>
            (<AppBar elevation={1} >
                <Toolbar style={{ minHeight: 52 }} disableGutters={true} sx={{ px: 1 }}>
                    <IconButton >
                        <ArrowBackIcon onClick={() => router.back()} />
                    </IconButton>

                    <Box sx={{ display: { xs: 'none', xl: 'block' } }} >
                        <Box display={'flex'}>
                            <Typography color={'black'} sx={{ ml: 1 }}>2019 XUV 500</Typography>
                            <Typography color={'black'} fontSize={14} sx={{ ml: 1 }}>L4-2.0L Turbo (B46D)</Typography>
                        </Box>
                    </Box>

                    <Box sx={{ display: { xs: 'block', xl: 'none' } }}>
                        <Typography color={'black'} sx={{ ml: 1 }}>(B46D)</Typography>
                    </Box>


                    <Box flexGrow={1} />

                    <OnlyIcons />

                    <Button variant='outlined' sx={{ mr: 1, ml: 1, display: { xs: 'none', xl: 'block' } }} component={Link} href='/home2'>Change Vehicle</Button>
                </Toolbar>
            </AppBar>
            <Toolbar style={{ minHeight: 12 }} />
            )
        </>
    )
}
