'use client'

import { setDrawer } from '@/app/GlobalRedux/slice/viewer.sclice';
import { Box, ButtonBase, Card, CardActionArea, CardHeader, Drawer, IconButton, Paper, Popper, Switch, Typography, useMediaQuery } from '@mui/material'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import IOSSwitch from '@/widgets/primary/widgets/IOSSwitch';
import { Close } from '@mui/icons-material';
import Storage from '@/utils/Storage';
import ApiHelper from '@/helpers/ApiHelper';


const MobileBottomSheet = ({ name, thumbUrl }) => {
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
                        <Typography fontSize={18} sx={{ mt: 0.2 }}>F6</Typography>
                    </Box>
                </Box>

                <Box sx={{ mt: 4, pb: 8 }}>
                    <ButtonBase sx={{ width: '100%', padding: 0 }}>
                        <Paper sx={{ py: 1, pl: 3, pr: 1, borderRadius: 2, width: '100%', textAlign: 'left' }} variant='outlined'>
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
                    </ButtonBase>

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

const DesktopBottomSheet = ({ thumbUrl, name }) => {
    const dispatch = useDispatch();
    const isOpen = useSelector(state => state.viewerSclice.drawer.isOpen);

    return (
        <Popper open={isOpen} style={{ position: 'absolute', left: '58px', top: '100px' }} >
            <Card sx={{ minWidth: 320 }} >
                <CardHeader title={'F-12'} titleTypographyProps={{ variant: 'h6' }} action={<IconButton onClick={() => dispatch(setDrawer({ isOpen: false }))}><Close /></IconButton>}>


                </CardHeader>
                <Box display={'flex'} sx={{ my: 2 }}>
                    <Paper sx={{ p: 1, ml: 2 }} variant='outlined'>
                        <Image src={thumbUrl} width={56} height={56} />
                    </Paper>
                    <Box>
                        <Typography sx={{ mt: 0, ml: 3 }} variant='h6'>{name}</Typography>
                        <Typography sx={{ mt: 1, ml: 3 }} >F6</Typography>
                    </Box>
                </Box>

                <Box sx={{ mt: 4, pb: 8, px: 2 }}>
                    <Card variant='outlined' sx={{ borderRadius: 2}}>
                        <CardActionArea  sx={{ py: 0.3, pl: 3, pr: 1}}>
                            <Box display={'flex'} alignItems={'center'}>
                                <Typography fontSize={16} flexGrow={1}>Component Checks</Typography>
                                <IconButton >
                                    <NavigateNextIcon />
                                </IconButton>
                            </Box>
                        </CardActionArea>
                    </Card>

                    <Card variant='outlined' sx={{ borderRadius: 2, mt: 2}}>
                        <CardActionArea  sx={{ py: 0.3, pl: 3, pr: 1}}>
                            <Box display={'flex'} alignItems={'center'}>
                                <Typography fontSize={16} flexGrow={1}>Component Checks</Typography>
                                <IconButton >
                                    <NavigateNextIcon />
                                </IconButton>
                            </Box>
                        </CardActionArea>
                    </Card>

                    <Card variant='outlined' sx={{ borderRadius: 2, mt: 2}}>
                        <CardActionArea  sx={{ py: 0.3, pl: 3, pr: 1}}>
                            <Box display={'flex'} alignItems={'center'}>
                                <Typography fontSize={16} flexGrow={1}>Component Checks</Typography>
                                <IconButton >
                                    <NavigateNextIcon />
                                </IconButton>
                            </Box>
                        </CardActionArea>
                    </Card>

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

    useEffect(() => {
        if (drawer.componentId) {
            const component = Storage.findComponentById(drawer.componentId);
            setName(component.oName.split('-')[0]);
            setCode(component.compCode)


            setThumbUrl(ApiHelper.API_URL + '665d90b3b5f09617079755_w1320h1080.webp');
        }
    })

    return (

        <>
            {isDesktop ? <DesktopBottomSheet name={name} code={code} thumbUrl={thumbUrl} /> : <MobileBottomSheet name={name} code={code} thumbUrl={thumbUrl} />}
        </>

    )
}
