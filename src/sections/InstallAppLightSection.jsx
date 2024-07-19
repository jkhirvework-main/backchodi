import Utils from '@/utils/Utils'
import CenteredBox from '@/widgets/secondary/CenterBox';
import CenteredBox2 from '@/widgets/secondary/CenterBox2';
import { Box, Container, Divider, Grid, Typography } from '@mui/material'
import { Montserrat, Roboto } from 'next/font/google';
import Image from 'next/image';
import React from 'react'

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400']
});

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400']
})



export default function InstallAppSection({isDark = false}) {
    return (
        <>
            {isDark ? null : <Divider />}

            <Box sx={{ marginY: 8, pb: 6, backgroundColor: isDark ? Utils.secondaryColor : 'white' }}>
                <Container maxWidth={'xl'}>
                    <Grid container rowSpacing={8}>
                        <Grid item sm={12} xs={12} md={8} lg={6} xl={6} >
                            <CenteredBox2 justifyContent={'right'}>
                                <Typography  className={montserrat.className} sx={{ color: isDark ? 'white' : 'black' ,fontWeight: 50, fontSize: { xs: 24, sm: 24, md: 30, lg: 30 } }}>Install the AUTODOC CLUB app!</Typography>
                                <Typography sx={{ mt: 2, fontSize: 16, color: '#7C8386' }} className={roboto.className}>Your personal car expenses manager, maintenance tips, reminders about upcoming appointments and service intervals, DIY repair instructions – all this on your phone.</Typography>

                                <Box display={'flex'} sx={{ mt: 4 }}>
                                    <Image src={isDark ? '/home/images/google-play-download-white.svg' : '/home/images/google-play-download.svg'} width={160} height={52} alt=''/>
                                    <Image src={isDark ? '/home/images/app-store-download-white.svg' : '/home/images/app-store-download.svg'} width={160} height={52} style={{ marginLeft: 32 }} alt='' />
                                </Box>
                            </CenteredBox2>

                        </Grid>

                        <Grid item sm={0} xs={0} md={2} lg={2} xl={2} />

                        <Grid item sm={12} xs={12} md={4} lg={4} xl={4} >
                            <Box display={'flex'} justifyContent={'center'}>
                                <Image src={isDark ? "/home/images/app_install_dark.svg" : "/home/images/app_install.svg"} width={342} height={310} alt="install " />

                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>

    )
}