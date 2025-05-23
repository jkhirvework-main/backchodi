'use client'

import { setCompChecksDrawer, setDrawer, setDtcDrawer, setPinOutDrawer } from '@/app/GlobalRedux/slice/viewer.sclice';
import { Box, ButtonBase, Card, CardActionArea, CardHeader, Drawer, IconButton, List, Paper, Popper, Switch, Typography, useMediaQuery } from '@mui/material'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import IOSSwitch from '@/widgets/primary/widgets/IOSSwitch';
import { Close } from '@mui/icons-material';
import Storage from '@/utils/Storage';
import { useRouter } from 'next/navigation';
import BackendHelper from '@/helpers/BackendHelper';
import Utils from '@/utils/Utils';

const ButtonListItem = ({ title, handleClick }) => {

    const router = useRouter();

    // const handleClick = () => {
    //     if (link) {
    //         // router.push(link);
    //     }

    // }

    return (
        <Card variant='outlined' sx={{ borderRadius: 2, mt: 2 }}>
            <CardActionArea sx={{ py: { xs: 1, xl: 0.3 }, pl: 3, pr: 1, }} onClick={handleClick} >
                <Box display={'flex'} alignItems={'center'}>
                    <Typography fontSize={16} flexGrow={1}>{title}</Typography>
                    <IconButton >
                        <NavigateNextIcon />
                    </IconButton>
                </Box>
            </CardActionArea>
        </Card>
    );
}

const ButtonList = ({ list, component }) => {


    const handlePinOuts = () => {
        Utils.dispatch(setPinOutDrawer({ isOpen: true, preData: component.getAllEcmConnections() }))
    }

    const handleComponentChecks = () => {
        Utils.dispatch(setCompChecksDrawer({ isOpen: true, preData: component.getComponentChecks() }))
    }

    const handleTroubleCodes = () => {
        Utils.dispatch(setDtcDrawer({ isOpen: true, preData: component.getTroubleCodes() }))
    }

    return (
        <List>
            {/* {list.map(item => {
                return <ButtonListItem key={Utils.getUId()} title={item.title} link={item.link} />
            })} */}

            <ButtonListItem key={Utils.getUId()} title={'Component Checks'} handleClick={handleComponentChecks} />
            <ButtonListItem key={Utils.getUId()} title={'Pin Outs'} handleClick={handlePinOuts} />
            <ButtonListItem key={Utils.getUId()} title={'Related DTC'} handleClick={handleTroubleCodes} />
        </List>
    );
}

const list = [{
    title: "Component Checks"
}, {
    title: "Pin Outs",
}, {
    title: "Trouble Codes"
}]


const MobileBottomSheet = ({ name, thumbUrl, code }) => {
    const dispatch = useDispatch();
    const isOpen = useSelector(state => state.viewerSclice.drawer.isOpen);

    return (
        <Drawer
            anchor={'bottom'}
            open={isOpen}
            onClose={() => dispatch(setDrawer({ isOpen: !isOpen }))}
            PaperProps={{ square: false, sx: { borderTopLeftRadius: 12, borderTopRightRadius: 12 } }}
        >
            {/* <Box sx={{ height: 500 }} display={'flex'} flexDirection={'column'} alignItems={'center'}>
    <Paper sx={{ mt: 4, p: 1.5, borderRadius: 2 }} elevation={1}>
        <Image src={'/home/images/sensor.png'} width={56} height={56} />
    </Paper>

    <Typography variant='h6' sx={{mt: 2}}>Ignition Coil - 1</Typography>
</Box> */}

            <Box sx={{ py: 4, px: 3 }}>
                <Box display={'flex'} alignItems={'center'}>
                    <Paper display="inline-block" sx={{ p: 1.5, borderRadius: 2 }} elevation={1} variant='outlined'>
                        <Image src={'/home/images/sensor.png'} width={56} height={56} alt='test' />
                    </Paper>

                    <Box sx={{ ml: 3 }}>
                        <Typography variant='h6' fontSize={22} >{name}</Typography>
                        <Typography fontSize={18} sx={{ mt: 0.2 }}>{code}</Typography>
                    </Box>
                </Box>

                <Box sx={{ mt: 4, pb: 8 }}>

                    <ButtonList list={list} />

                    <Paper sx={{ py: 2, pl: 3, pr: 1, borderRadius: 2, width: '100%', textAlign: 'left', mt: 2 }} variant='outlined'>
                        <Box display={'flex'} alignItems={'center'}>
                            <Typography fontSize={16} flexGrow={1}>Open Coupler</Typography>
                            <IOSSwitch />
                        </Box>
                    </Paper>

                </Box>

            </Box>

        </Drawer >
    );
}

const DesktopBottomSheet = ({ thumbUrl, name, code, component }) => {
    const dispatch = useDispatch();
    const isOpen = useSelector(state => state.viewerSclice.drawer.isOpen);

    return (
        <Popper open={isOpen} style={{ position: 'absolute', left: '58px', top: '100px' }} >
            <Card sx={{ minWidth: 320, maxWidth: 320 }} variant='outlined'>
                <CardHeader title={'Component Details'} titleTypographyProps={{ variant: 'h6' }} action={<IconButton onClick={() => dispatch(setDrawer({ isOpen: false }))}><Close /></IconButton>}>


                </CardHeader>
                <Box display={'flex'} sx={{ my: 2 }}>
                    <Paper sx={{ p: 1, ml: 2 }} variant='outlined'>
                        <Image src={thumbUrl} width={56} height={56} />
                    </Paper>
                    <Box>
                        <Typography sx={{ mt: 0, ml: 3, fontSize: 16 }} variant='h6'>{name}</Typography>
                        <Typography sx={{ mt: 1, ml: 3, fontSize: 14 }} >{code}</Typography>
                    </Box>
                </Box>

                <Box sx={{ mt: 4, pb: 8, px: 2 }}>
                    {/* <Card variant='outlined' sx={{ borderRadius: 2 }}>
                        <CardActionArea sx={{ py: 0.3, pl: 3, pr: 1 }}>
                            <Box display={'flex'} alignItems={'center'}>
                                <Typography fontSize={16} flexGrow={1}>Component Checks</Typography>
                                <IconButton >
                                    <NavigateNextIcon />
                                </IconButton>
                            </Box>
                        </CardActionArea>
                    </Card>

                    <Card variant='outlined' sx={{ borderRadius: 2, mt: 2 }}>
                        <CardActionArea sx={{ py: 0.3, pl: 3, pr: 1 }}>
                            <Box display={'flex'} alignItems={'center'}>
                                <Typography fontSize={16} flexGrow={1}>Component Checks</Typography>
                                <IconButton >
                                    <NavigateNextIcon />
                                </IconButton>
                            </Box>
                        </CardActionArea>
                    </Card>

                    <Card variant='outlined' sx={{ borderRadius: 2, mt: 2 }}>
                        <CardActionArea sx={{ py: 0.3, pl: 3, pr: 1 }}>
                            <Box display={'flex'} alignItems={'center'}>
                                <Typography fontSize={16} flexGrow={1}>Component Checks</Typography>
                                <IconButton >
                                    <NavigateNextIcon />
                                </IconButton>
                            </Box>
                        </CardActionArea>
                    </Card> */}


                    <ButtonList list={list} component={component} />

                    {/* <ButtonBase sx={{ width: '100%', padding: 0 }}>
                        <Paper sx={{ py: 0.5, pl: 3, pr: 1, borderRadius: 2, width: '100%', textAlign: 'left' }} variant='outlined'>
                            <Box display={'flex'} alignItems={'center'}>
                                <Typography fontSize={16} flexGrow={1}>Component Checks</Typography>
                                <IconButton >
                                    <NavigateNextIcon />
                                </IconButton>
                            </Box>
                        </Paper>
                    </ButtonBase>
                    <ButtonBase sx={{ width: '100%', padding: 0, mt: 2 }}>
                        <Paper sx={{ py: 1, pl: 3, pr: 1, borderRadius: 2, width: '100%', textAlign: 'left' }} variant='outlined'>
                            <Box display={'flex'} alignItems={'center'}>
                                <Typography fontSize={16} flexGrow={1}>Pin Outs</Typography>
                                <IconButton >
                                    <NavigateNextIcon />
                                </IconButton>
                            </Box>
                        </Paper>
                    </ButtonBase>
                    <ButtonBase sx={{ width: '100%', padding: 0, mt: 2 }}>
                        <Paper sx={{ py: 1, pl: 3, pr: 1, borderRadius: 2, width: '100%', textAlign: 'left' }} variant='outlined'>
                            <Box display={'flex'} alignItems={'center'}>
                                <Typography fontSize={16} flexGrow={1}>Trouble Codes</Typography>
                                <IconButton >
                                    <NavigateNextIcon />
                                </IconButton>
                            </Box>
                        </Paper>
                    </ButtonBase> */}

                    <Paper sx={{ py: 1.2, pl: 3, pr: 1, borderRadius: 2, width: '100%', textAlign: 'left', mt: 2 }} variant='outlined'>
                        <Box display={'flex'} alignItems={'center'}>
                            <Typography fontSize={16} flexGrow={1}>Open Coupler</Typography>
                            <IOSSwitch />
                        </Box>
                    </Paper>
                </Box>

            </Card>
        </Popper>
    );
}

export default function DiagramBottomSheet() {
    const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('sm'));
    const drawer = useSelector(state => state.viewerSclice.drawer);
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [thumbUrl, setThumbUrl] = useState('');
    const [component, setComponent] = useState(null);

    useEffect(() => {
        if (drawer.componentId) {
            const component = Storage.findComponentById(drawer.componentId);
            setName(component.oName.split('-')[0]);
            setCode(component.getCompCode())
            setComponent(component);

            setThumbUrl(BackendHelper.API_URL + '665d90b3b5f09617079755_w1320h1080.webp');
        }
    })

    return (

        <>
            {isDesktop ? <DesktopBottomSheet name={name} code={code} thumbUrl={thumbUrl} component={component} /> : <MobileBottomSheet name={name} code={code} thumbUrl={thumbUrl} />}
        </>

    )
}
