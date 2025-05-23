import { Stack, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

export default function Logo() {
    return (
        <Stack direction="row" spacing={2} alignItems="center"  >
            <Image src={'/icon-192x192.png'} width={30} height={30} />
            <Typography sx={{ fontSize: 22, fontWeight: 700, letterSpacing: 1.2 }}>CARCLINIC FIX</Typography>
        </Stack>
    )
}
