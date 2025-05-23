'use client'

import { registerUser } from '@/app/user/actions/UserAction'
import Utils from '@/utils/Utils'
import { Box, Button, Card, CardContent, IconButton, InputAdornment, Link, TextField, Typography } from '@mui/material'
import { IconArrowLeft, IconBuilding, IconBuildingStore, IconMail, IconMapPin, IconMobiledata, IconSignature } from '@tabler/icons-react'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'

export default function RegisterPage() {
    const {mobId} = useParams();

    const [nameValid, setNameValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);
    const [WorkshopNameValid, setWorkshopNameValid] = useState(true);
    const [workshopAddressValid, setWorkAddressValid] = useState(true);

    const [nameHelperText, setNameHelperText] = useState('');
    const [emailHelperText, setEmailHelperText] = useState('');
    const [workshopNameHelperText, setWorkshopNameHelperText] = useState('');
    const [workshopAddressHelperText, setWorkshopAddressHelperText] = useState('');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [workshopName, setWorkshopName] = useState('');
    const [workshopAddress, setWorkshopAddress] = useState('');

    const nameHandler = (e) => {
        if(name.length > 3){
            setNameValid(true);
            setNameHelperText('');
        }else {
            setNameValid(false)
            setNameHelperText('Name should be atleast 3 characters long');
        }

        setName(e.target.value);
    }

    const emailHandler = (e) => {
        if(email.length > 3 && email.includes('@') && email.includes('.')){
            setEmailValid(true);
            setEmailHelperText('');
        }else {
            setEmailValid(false);
            setEmailHelperText('Email should be a valid email');
            
        }

        setEmail(e.target.value);
    }

    const workshopNameHandler = (e) => {
        if(workshopName.length > 3){
            setWorkshopNameValid(true);
            setWorkshopNameHelperText('');
        }else {
            setWorkshopNameValid(false)
            setEmailHelperText('Workshop Name should be atleast 3 characters long');
        }

        setWorkshopName(e.target.value);
    }

    const workshopAddressHandler = (e) => {
        if(workshopAddress.length > 3){
            setWorkAddressValid(true);
            setWorkshopAddressHelperText('');
        }else {
            setWorkAddressValid(false);
            setWorkshopNameHelperText('Workshop Address should be atleast 3 characters long');
        }

        setWorkshopAddress(e.target.value); 
    }

    const register = async () => {
        if(name.length < 3){
            setNameValid(false);
            setNameHelperText('Name should be atleast 3 characters long');
        }

        if(email.length < 3){
            setEmailValid(false);
            setEmailHelperText('Email should be atleast 3 characters long');
        }

        if(workshopName.length < 3){
            setWorkshopNameValid(false);
            setWorkshopNameHelperText('Workshop Name should be atleast 3 characters long');
        }

        if(workshopAddress.length < 3){
            setWorkAddressValid(false);
            setWorkshopAddressHelperText('Workshop Address should be atleast 3 characters long');
        }

        if(nameValid && emailValid && WorkshopNameValid && workshopAddressValid){
            const data = await registerUser(mobId, name, email, workshopName, workshopAddress);
            console.log(data)
        }
    }

    return (
        <>
            <Box sx={{ width: '100vw', height: '100vh' }} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Card elevation={0} style={{ boxShadow: 'rgba(145, 158, 171, 0.3) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px' }}>
                    <CardContent sx={{ p: 5 }}>

                        <Box sx={{ maxWidth: 360 }}>
                            <IconButton sx={{ borderWidth: 1 }} component={Link} href='/login'>
                                <IconArrowLeft />
                            </IconButton>
                            <Box sx={{ maxWidth: 300, mb: 6 }}>
                                <Typography variant='h3' sx={{ mt: 2 }}>Hello! Register to get started</Typography>
                            </Box>

                            <Box>
                                <TextField
                                    InputProps={{
                                        startAdornment: <IconSignature style={{ color: Utils.primaryColor }} />
                                    }}
                                    error={!nameValid}
                                    helperText={nameHelperText}
                                    value={name}
                                    fullWidth
                                    onChange={nameHandler}
                                    placeholder='Full Name'
                                    
                                />

                                <TextField
                                    InputProps={{
                                        startAdornment: <IconMail style={{ color: Utils.primaryColor }} />
                                    }}
                                    error={!emailValid}
                                    helperText={emailHelperText}
                                    value={email}
                                    fullWidth
                                    onChange={emailHandler}
                                    placeholder='Email'
                                    sx={{ mt: 2 }}
                                />

                                <TextField
                                    InputProps={{
                                        startAdornment: <IconBuildingStore style={{ color: Utils.primaryColor }} />
                                    }}
                                    error={!WorkshopNameValid}
                                    helperText={workshopNameHelperText}
                                    value={workshopName}
                                    fullWidth
                                    onChange={workshopNameHandler}
                                    placeholder='Workshop Name'
                                    sx={{ mt: 2 }}
                                />

                                <TextField
                                    InputProps={{
                                        startAdornment: <IconMapPin style={{ color: Utils.primaryColor }} />
                                    }}
                                    error={!workshopAddressValid}
                                    helperText={workshopAddressHelperText}
                                    value={workshopAddress}
                                    fullWidth
                                    onChange={workshopAddressHandler}
                                    placeholder='Workshop Address'
                                    sx={{ mt: 2 }}
                                />

                                <Button onClick={register} disableElevation variant='contained' size="large" sx={{ mt: 6, mb: 2 }} fullWidth={true}>Register</Button>

                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </>
    )
}
