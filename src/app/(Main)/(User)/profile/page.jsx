import { getProfileData } from '@/app/user/actions/UserAction'
import Utils from '@/utils/Utils'
import CustomFormLabel from '@/widgets/mui/elements/CustomFormLabel'
import CustomTextField from '@/widgets/mui/elements/CustomTextField'
import { Avatar, Box, Button, Card, CardContent, CardHeader, Container, Divider, Grid, Link, TextField, Typography } from '@mui/material'
import { IconArrowRight, IconBuildingStore, IconChevronRight, IconDeviceMobile, IconMail, IconMapPin, IconMobiledata, IconUser } from '@tabler/icons-react'
import React from 'react'

const ActivePlanComponent = ({plan}) => {
    
    return (
        <>
            <Card variant='outlined' sx={{ mt: 6, borderRadius: 2 }}>
                <CardContent>
                    <Box display={'flex'} >
                        <Box flexGrow={1}>
                            <Typography variant='h5' sx={{ color: Utils.primaryColor }}>{plan.planName}</Typography>
                            <Box sx={{ mt: 1 }}>
                                <Typography variant='body2'> {plan.remainingDays} Days remaining</Typography>
                            </Box>

                        </Box>
                        <Box>
                            <Typography variant='h5' >₹ {plan.amount}/month</Typography>
                        </Box>

                    </Box>
                </CardContent>
                <Divider />
                <CardContent>
                    <Box display={'flex'} justifyContent={true} alignItems={true} alignContent={true}>
                        <Box flexGrow={1}>
                            <Button variant='outlined' sx={{}}>Cancel Subscription</Button>
                        </Box>
                        <Button variant='text' endIcon={<IconChevronRight width={18} height={18} />}>Upgrade Plan</Button>
                    </Box>

                </CardContent>
            </Card>

        </>
    )
}


export default async function Profile() {
    const data = await getProfileData();

    const { user, activePlans } = data;

    return (
        <>
            <main style={{ backgroundColor: '#f9f9fb', height: '100vh' }}>
                <Container maxWidth={'md'}>
                    <Card elevation={0} sx={{ mt: 4 }}>
                        <CardHeader title={'Profile'} sx={{ mx: 2, mt: 1 }} />
                        <Divider sx={{ mx: 3 }} />
                        <CardContent sx={{ p: 4 }}>
                            <Box display={'flex'} >

                                <Avatar sx={{ height: 120, width: 120 }} src='/home/images/2.webp' variant="rounded" />

                                <Box sx={{ ml: 4 }} flexGrow={1}>
                                    <Typography variant='h3'>Mr. {user.name}</Typography>
                                    <Box sx={{ mt: 1 }}>
                                        <Typography variant='body' >{user.mob?.mob}</Typography>

                                    </Box>
                                </Box>
                                <Box>
                                    <Button variant='outlined' component={Link} href='/profile/edit'>Edit</Button>
                                </Box>

                            </Box>

                            

                            <Card variant='outlined' sx={{ mt: 6, mb: 4, borderRadius: 2 }}>
                                <CardHeader title={'Personal Information'} />
                                <Divider />
                                <CardContent>
                                    <Grid container rowSpacing={2} columnSpacing={4}>
                                        <Grid item xl={6} xs={12} lg={6}>
                                            <CustomFormLabel sx={{ mt: 1 }}>Full Name</CustomFormLabel>
                                            <CustomTextField
                                                value={user.name}
                                                fullWidth
                                                disabled
                                                InputProps={{
                                                    startAdornment: <IconUser />
                                                }} />
                                        </Grid>

                                        <Grid item xl={6} xs={12} lg={6}>
                                            <CustomFormLabel sx={{ mt: 1 }}>Mobile Number</CustomFormLabel>
                                            <CustomTextField
                                                value={user.mob.mob}
                                                fullWidth
                                                disabled
                                                InputProps={{
                                                    startAdornment: <IconDeviceMobile />
                                                }} />
                                        </Grid>

                                        <Grid item xl={6} xs={12} lg={6}>
                                            <CustomFormLabel sx={{ mt: 1 }}>Emai</CustomFormLabel>
                                            <CustomTextField
                                                value={user.email}
                                                fullWidth
                                                disabled
                                                InputProps={{
                                                    startAdornment: <IconMail />
                                                }} />
                                        </Grid>

                                        <Grid item xl={6} xs={12} lg={6}>
                                            <CustomFormLabel sx={{ mt: 1 }}>Workshop Name</CustomFormLabel>
                                            <CustomTextField
                                                value={user.workShopName}
                                                fullWidth
                                                disabled
                                                InputProps={{
                                                    startAdornment: <IconBuildingStore />
                                                }} />
                                        </Grid>

                                        <Grid item xl={6} xs={12} lg={6}>
                                            <CustomFormLabel sx={{ mt: 1 }}>Workshop Address</CustomFormLabel>
                                            <CustomTextField
                                                value={user.workShopAddress}
                                                fullWidth
                                                disabled
                                                InputProps={{
                                                    startAdornment: <IconMapPin />
                                                }} />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>

                            {activePlans.map((plan, index) => <ActivePlanComponent key={index} plan={plan} />)}

                        </CardContent>
                    </Card>
                </Container>
            </main>

        </>
    )
}
