'use client'

import MyLogo from '@/widgets/primary/appBar/MyLogo'
import { AppBar, Autocomplete, Box, Checkbox, Container, Grid, TextField, Toolbar, Typography } from '@mui/material'
import { Montserrat } from 'next/font/google'
import React, { useState } from 'react'
import FormAutocomplete from './FormAutoComplete'
import LargeButton from '@/widgets/secondary/LargeButton'

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['600']
})

const TextFieldWithLabel = ({ label }) => {
    return (
        <>
            <Typography fontSize={13} fontWeight={500}>{label}</Typography>
            <TextField size='small' fullWidth sx={{ borderRadius: 1, mt: 0.2 }} />
        </>
    )
}

const FormLabel = ({ label }) => {
    return <Typography fontSize={13} fontWeight={500} sx={{ mb: 0.2 }}>{label}</Typography>
}

const countryCodes = [{
    label: '+91',
    value: '+91'
}]



export default function Page() {

    const [isSaveInfo, setSaveInfo] = useState(false);

    return (
        <>
            <AppBar elevation={0} position="fixed">
                <Toolbar >
                    <Container maxWidth={'xl'}>
                        <MyLogo />
                    </Container>
                </Toolbar>
            </AppBar>

            {/* <Toolbar /> */}

            <Box sx={{ mt: 4 }}>
                <Container maxWidth={'md'} >
                    <Box sx={{ px: { xs: 2, xl: 12 }, pb: 8 }}>
                        <Typography className={montserrat.className} sx={{ fontSize: 22, mb: 3 }}>Billing address and delivery address</Typography>

                        <Grid container sx={{ mt: 0 }} columnSpacing={2} rowSpacing={{xl: 3, xs: 2}}>
                            <Grid item xs={6} xl={6}>
                                <TextFieldWithLabel label={'First name *'} />
                            </Grid>

                            <Grid item xs={6} xl={6}>
                                <TextFieldWithLabel label={'Last name *'} />
                            </Grid>

                            <Grid item xs={12} xl={6}>
                                <TextFieldWithLabel label={'Email'} />
                            </Grid>
                            <Grid item xs={12} xl={6}>
                                <Typography fontSize={13} fontWeight={500}>{'Phone *'}</Typography>

                                <Box display={'flex'}>
                                    <Autocomplete
                                        size='small'
                                        sx={{ mt: 0.2 }}
                                        renderInput={(props) => <TextField {...props} />}
                                        options={countryCodes}
                                    />

                                    <TextField size='small' fullWidth sx={{ borderRadius: 1, mt: 0.2, ml: 1.5 }} />
                                </Box>
                            </Grid>

                            <Grid item xs={12} xl={12}>
                                <Box display={'flex'} sx={{ mt: 1 }} alignContent={'center'} alignItems={'center'}>
                                    <Checkbox sx={{ m: 0, p: 0 }} size='small' checked={isSaveInfo} onChange={(e, v) => setSaveInfo(v)} />
                                    <Typography fontSize={13} fontWeight={500} sx={{ ml: 1 }}>{'Company address'}</Typography>
                                </Box>
                            </Grid>

                            <Grid item xs={6} xl={6}>
                                <FormLabel label={'Brand'} />
                                <FormAutocomplete
                                    size='small'
                                    sx={{ mt: 1 }}
                                    renderInput={(props) => <TextField {...props} />}
                                />
                            </Grid>

                            <Grid item xs={6} xl={6}>
                                <FormLabel label={'Model'} />
                                <FormAutocomplete
                                    size='small'
                                    sx={{ mt: 1 }}
                                    renderInput={(props) => <TextField {...props} />}
                                />
                            </Grid>

                            <Grid item xs={3} xl={3}>
                                <FormLabel label={'Year'} />
                                <FormAutocomplete
                                    size='small'
                                    sx={{ mt: 1 }}
                                    renderInput={(props) => <TextField {...props} />}
                                />
                            </Grid>

                            <Grid item xs={9} xl={9}>
                                <FormLabel label={'Engine'} />
                                <FormAutocomplete
                                    size='small'
                                    sx={{ mt: 1 }}
                                    renderInput={(props) => <TextField {...props} />}
                                />
                            </Grid>

                            <Grid item xs={12} xl={12}>
                                <FormLabel label={'Diagram Type'} />
                                <FormAutocomplete
                                    size='small'
                                    sx={{ mt: 1 }}
                                    renderInput={(props) => <TextField {...props} />}
                                />
                            </Grid>


                        </Grid>

                        <Typography sx={{ color: '#8e979c', fontSize: 13, mt: 0.5 }}> So we can contact you with any queries about your order</Typography>

                        <Box display={'flex'} sx={{ mt: 3 }} alignContent={'center'} alignItems={'center'}>
                            <Checkbox sx={{ m: 0, p: 0 }} size='small' checked={isSaveInfo} onChange={(e, v) => setSaveInfo(v)} />
                            <Typography fontSize={13} fontWeight={500} sx={{ ml: 1 }}>Want a call from our support team</Typography>
                        </Box>

                        <Box display={'flex'} sx={{ mt: 3 }} textAlign={'top'}>
                            <Checkbox sx={{ m: 0, p: 0 }} size='small' checked={isSaveInfo} onChange={(e, v) => setSaveInfo(v)} />
                            <Typography fontSize={13} fontWeight={500} sx={{ ml: 1 }}>Yes, AUTODOC may contact me by telephone or SMS for the purpose of informing me about products and special offers, for the purpose of surveys, and for the collection of statistical data. I understand that I can revoke this consent at any time.</Typography>
                        </Box>

                        <Box display={'flex'} justifyContent={'center'} justifyItems={'center'}>
                            <LargeButton px={16}>Next</LargeButton>
                        </Box>

                    </Box>

                </Container>

            </Box>

        </>
    )
}
