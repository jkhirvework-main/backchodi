'use client'

import Logo from '@/app/(Utils)/(widgets)/Logo'
import { sendOtp } from '@/app/user/actions/UserAction'
import { Box, Button, Card, CardContent, FormControl, Typography } from '@mui/material'
import {  useRouter } from 'next/navigation'
import React, { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'

export default function Page() {
  const [phone, setPhone] = useState('');
  const router = useRouter();

  const sendOTP = async () => {
    if (phone.length < 10) {
      alert('Please enter a valid phone number')
      return
    }

    const data = await sendOtp(phone);
    router.push(`/login/${phone}`)
  }


  return (
    <>
      <Box sx={{ width: '100vw', height: '100vh' }} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Card elevation={0} style={{ boxShadow: 'rgba(145, 158, 171, 0.3) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px' }}>
          <CardContent sx={{ p: 5 }}>

            <Box sx={{ maxWidth: 360 }}>
              <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Logo />
              </Box>

              <Box sx={{ maxWidth: 300, mb: 6 }}>
                <Typography variant='h3' sx={{ mt: 4 }}>Welcome back! Glad to see you, Again!</Typography>
              </Box>

              <PhoneInput
                country="in"
                value={phone}
                onChange={(phone) => setPhone(phone)}
                specialLabel=""
                inputStyle={{ paddingTop: 14, paddingBottom: 14, width: 300 }}
              />

              <Button onClick={sendOTP} disableElevation variant='contained' size="large" sx={{ mt: 4, mb: 2 }} fullWidth={true} >Send OTP</Button>

            </Box>

          </CardContent>
        </Card>
      </Box>
    </>
  )
}
