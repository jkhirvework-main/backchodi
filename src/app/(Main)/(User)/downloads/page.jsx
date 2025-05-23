import { Box, Button, Card, CardContent, Container, Divider, Grid, Link, Typography } from '@mui/material'
import { IconWorldWww } from '@tabler/icons-react'
import Image from 'next/image'
import React from 'react'

export default function DownloadPage() {
    return (
        <>
            <Container sx={{ backgroundColor: 'white', mt: {xl: 8, xs: 0}, px: 4, pt: {xl: 4, xs: 8} }} maxWidth={'xl'}>


                <Grid container justify="center" alignItems="center">
                    <Grid item xs={12} xl={6}>
                        <Box>
                            <Box display={'flex'} justifyContent={'center'} textAlign={'center'}>
                                <Typography variant={'h1'}>Available Now Download !</Typography>
                            </Box>

                            <Box display={'flex'} justifyContent={'center'} sx={{ mt: {xl: 4, xs: 8} }}>
                                <Box component={Link} href='/'>
                                    <Image src={'/home/images/google-play-download.svg'} width={160} height={52} alt='' />
                                </Box>
                                <Box component={Link} href='/'>
                                    <Image src={'/home/images/app-store-download.svg'} width={160} height={52} style={{ marginLeft: 16 }} alt='' />
                                </Box>

                            </Box>

                            <Box display={'flex'} justifyContent={'center'}>
                                <Divider sx={{ mt: 6, width: 400 }} />
                            </Box>

                            <Box display={'flex'} justifyContent={'center'} sx={{ py: 4 }}>
                                <IconWorldWww width={22} height={22} />

                                <Link href={'https://www.google.com'} sx={{ ml: 2 }} target={'_blank'} underline={'none'}>www.google.com</Link>
                            </Box>


                        </Box>




                    </Grid>
                    <Grid item xs={12} xl={6}>
                        <img src={'images/screenshot.png'} />
                    </Grid>
                </Grid>


            </Container>
        </>
    )
}
