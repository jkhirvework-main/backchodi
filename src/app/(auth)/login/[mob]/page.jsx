'use client'

import { setCookies, verifyOtp } from '@/app/user/actions/UserAction';
import { Box, Button, Card, CardContent, IconButton, Link, Typography } from '@mui/material'
import { IconArrowLeft } from '@tabler/icons-react'
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import OTPInput from "react-otp-input";



export default function OtpPage() {

    // 

    const [code, setCode] = useState("");
    const router = useRouter();
    const { mob } = useParams();
    const handleChange = (code) => {
        setCode(code)
    };

    const otpHandler = async () => {
        if (code.length === 5) {
            const data = await verifyOtp(mob, code);
            
            if(data && data.status){
                if(data.isRegistered){
                    await setCookies('token', data.token+"");
                    const user = data.user;

                    localStorage.setItem('user', JSON.stringify(user));
                }
                router.push(data.url)
            }else {
                alert(data.message)
            }

            
        }
    }



    return (
        <>
            <Box sx={{ width: '100vw', height: '100vh' }} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Card elevation={0} style={{ boxShadow: 'rgba(145, 158, 171, 0.3) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px' }}>
                    <CardContent sx={{ p: 5 }}>

                        <Box sx={{ maxWidth: 360 }}>
                            <IconButton sx={{ borderWidth: 1 }} onClick={() => router.back()}>
                                <IconArrowLeft />
                            </IconButton>

                            <Box sx={{ maxWidth: 300, mb: 6 }}>
                                <Typography variant='h4' sx={{ mt: 4 }}>OTP Verification</Typography>
                                <Box sx={{ mt: 2 }}></Box>
                                <Typography variant='body' >Enter the OTP sent to your phone number</Typography>
                            </Box>

                            <Box sx={{ mt: 4 }} display={'flex'} justifyContent={'center'}>

                                <OTPInput
                                    value={code}
                                    onChange={handleChange}
                                    numInputs={5}
                                    isInputNum={true}
                                    renderInput={(props) => <input {...props} />}
                                    shouldAutoFocus={true}
                                    inputStyle={{
                                        border: "1px solid grey",
                                        borderRadius: "4px",
                                        width: "46px",
                                        height: "46px",
                                        fontSize: "16px",
                                        color: "#000",
                                        fontWeight: "400",
                                        caretColor: "blue",
                                        marginRight: 12,
                                    }}
                                    focusStyle={{
                                        border: "1px solid #CFD3DB",
                                        outline: "none"
                                    }}
                                />
                            </Box>

                            <Button onClick={otpHandler} disableElevation variant='contained' size="large" sx={{ mt: 6, mb: 2 }} fullWidth={true}>Login</Button>

                        </Box>


                    </CardContent>
                </Card>
            </Box>
        </>
    )
}
