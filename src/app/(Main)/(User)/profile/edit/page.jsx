'use client'

import { getProfileData, updateProfile } from '@/app/user/actions/UserAction';
import CustomFormLabel from '@/widgets/mui/elements/CustomFormLabel'
import CustomTextField from '@/widgets/mui/elements/CustomTextField'
import { Avatar, Box, Button, Card, CardContent, CardHeader, Container, Divider, Grid, Link, Stack, Typography } from '@mui/material'
import { IconBuildingStore, IconDeviceMobile, IconMail, IconMapPin, IconUser } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

export default function Page() {

    
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [workShopName, setWorkShopName] = React.useState('');
    const [workShopAddress, setWorkShopAddress] = React.useState('');
    const [mob, setMob] = React.useState('');
    const router = useRouter();

    
    useEffect(() => {
        (async () => {
            const data = await getProfileData();
            const {user} = data;

            setName(user.name);
            setEmail(user.email);
            setWorkShopName(user.workShopName);
            setWorkShopAddress(user.workShopAddress);
            setMob(user.mob.mob);
        })();
    }, []);

    const updateHandler = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const data = await updateProfile(name, email, workShopName, workShopAddress, user.id);
        router.push('/profile')
    }

    return (
        <>
            <Container maxWidth={'md'}>
                <Card elevation={0} sx={{ mt: 4 }}>
                    <CardHeader title={'Update Profile'} sx={{ mx: 2, mt: 1 }} />
                    <Divider sx={{ mx: 3 }} />
                    <CardContent sx={{ p: 4 }}>
                        <Box display={'flex'} >
                            <Avatar sx={{ height: 120, width: 120 }} src='/home/images/2.webp' variant="rounded" />

                            <Box sx={{ ml: 4 }} flexGrow={1}>
                                <Typography variant='h3'>Mr. {name}</Typography>
                                <Box sx={{ mt: 1 }}>
                                    <Typography variant='body' >{mob}</Typography>

                                </Box>
                            </Box>
                            <Box>
                                {/* <Button variant='outlined'>Edit</Button> */}
                            </Box>
                        </Box>


                        <Card variant='outlined' sx={{ mt: 6, mb: 4, borderRadius: 2 }}>
                            <CardHeader title={'Personal Information'} />
                            <Divider />
                            <CardContent>
                                <Grid container rowSpacing={2} columnSpacing={4}>
                                    <Grid item xl={6}>
                                        <CustomFormLabel sx={{ mt: 1 }}>Full Name</CustomFormLabel>
                                        <CustomTextField
                                            value={name}
                                            fullWidth
                                            onChange={(e) => setName(e.target.value)}
                                            InputProps={{
                                                startAdornment: <IconUser />
                                            }} />
                                    </Grid>

                                    <Grid item xl={6}>
                                        <CustomFormLabel sx={{ mt: 1 }}>Mobile Number</CustomFormLabel>
                                        <CustomTextField
                                            value={mob}
                                            fullWidth
                                            disabled
                            
                                            InputProps={{
                                                startAdornment: <IconDeviceMobile />
                                            }} />
                                    </Grid>

                                    <Grid item xl={6}>
                                        <CustomFormLabel sx={{ mt: 1 }}>Emai</CustomFormLabel>
                                        <CustomTextField
                                            value={email}
                                            fullWidth
                                            onChange={(e) => setEmail(e.target.value)}
                                            InputProps={{
                                                startAdornment: <IconMail />
                                            }} />
                                    </Grid>

                                    <Grid item xl={6}>
                                        <CustomFormLabel sx={{ mt: 1 }}>Workshop Name</CustomFormLabel>
                                        <CustomTextField
                                            value={workShopName}
                                            fullWidth
                                            onChange={(e) => setWorkShopName(e.target.value)}
                                            InputProps={{
                                                startAdornment: <IconBuildingStore />
                                            }} />
                                    </Grid>

                                    <Grid item xl={12}>
                                        <CustomFormLabel sx={{ mt: 1 }}>Workshop Address</CustomFormLabel>
                                        <CustomTextField
                                            value={workShopAddress}
                                            fullWidth
                                            onChange={(e) => setWorkShopAddress(e.target.value)}
                                            InputProps={{
                                                startAdornment: <IconMapPin />
                                            }} />
                                    </Grid>
                                </Grid>

                                <Stack direction={'row'} spacing={2} sx={{ mt: 4 }}>
                                    <Box flexGrow={1}></Box>
                                    <Button variant='outlined' component={Link} href='/profile'>Cancel</Button>   
                                    <Button variant='contained' onClick={updateHandler}>Update</Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    </CardContent>

                </Card>
            </Container>
        </>
    )
}
