import { Box, Container } from '@mui/material'
import { Montserrat } from 'next/font/google'
import React from 'react'
import DtcSection from './components/DtcSection'


export default function page() {
    return (
        <>
            <Box>
                <Container maxWidth={'xl'}>
                    <DtcSection />

                </Container>
            </Box>
        </>
    )
}
