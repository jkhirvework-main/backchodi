import { Box,  Container } from '@mui/material'
import React from 'react'
import TroubleCodeSection from './TroubleCodeSection'

export default function page() {

    const data = [{
        code: 'P0001',
        title: 'Tata internal caustion error'
    }, {
        code: 'P0301',
        title: 'Tata internal caustion error 34'
    }]

    return (
        <Box>
            <Container maxWidth={'xl'}>

                <TroubleCodeSection data={data} />

            </Container>
        </Box>
    )
}
