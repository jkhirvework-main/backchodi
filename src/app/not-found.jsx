import { Box, Button, Container, Link, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

export default function notFoundPage() {
    return (
        <main>
            <Box
                display="flex"
                flexDirection="column"
                height="100vh"
                textAlign="center"
                justifyContent="center"
            >
                <Container maxWidth={'sm'}>
                    <Image
                        src={"/images/backgrounds/errorimg.png"}
                        alt="404" width={240} height={240}
                        
                    />

                    <Typography align="center" variant="h2" mb={4}>
                        Opps!!!
                    </Typography>
                    <Typography align="center" variant="h5" mb={4}>
                        This page you are looking for could not be found.
                    </Typography>
                    <Button
                        color="primary"
                        variant="contained"
                        component={Link}
                        href="/home2"
                        disableElevation
                    >
                        Go Back to Home
                    </Button>
                </Container>

            </Box>

        </main>

    )
}
