import CheckList from '@/widgets/secondary/CheckList'
import LargeButton from '@/widgets/secondary/LargeButton'
import MainSectionHeader from '@/widgets/secondary/MainSectionHeader'
import { Box, Container, Grid } from '@mui/material'
import Image from 'next/image'
import React from 'react'

export default function MobileSection() {

    const texts = [
        "Use AUTODOC's manuals for DIY replacement of car parts and consumables and save on repair shop services.",
        "Explore over 20710 PDF replacement manuals compiled by our specialists.",
        "Get practical information on car parts installation with detailed step-by-step instructions and photos.",
        "Save manuals in your Favourites for easy access.",
        "Share files with your friends."
    ]

    return (
        <Container maxWidth={'xl'}>
            <MainSectionHeader title={'Professional replacement manuals'} subTitle={'Make use of our years of professional experience to repair your car.'} />

            <Grid container columnSpacing={4} sx={{ mt: 4, mb: 8 }} rowSpacing={4}>
                <Grid item lg={6} xs={12} sm={12}>
                    <Box display={'flex'} justifyContent={{xl: 'right', xs: 'center', sm: 'center', lg: 'right'}} alignItems={'right'} alignContent={'right'}>
                        <Image alt="" src='/home/images/section-6-phone.png' width={373} height={746} layout={'intrinsic'} />
                    </Box>
                </Grid>

                <Grid item lg={6} xs={12} sm={12}>
                    <CheckList mt={{ xl: 4, lg: 4, md: 0, sm: 0, xs: 0 }} list={texts} minWidth='32px' fontSize={{ lg: 16, xl: 16, md: 14, sm: 14, xs: 14 }} />

                    <Box style={{ display: 'flex', justifyContent: 'left', justifyItems: 'left' }} >
                        <LargeButton px={{ xl: 8, lg: 8 }} ml={{ xl: 6 }} mt={{ xl: 3, lg: 3, md: 3, sm: 2, xs: 2 }} >GO To Tutorials</LargeButton>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}
