import CheckList from '@/widgets/secondary/CheckList'
import LargeButton from '@/widgets/secondary/LargeButton'
import MainSectionHeader from '@/widgets/secondary/MainSectionHeader'
import { Box, Container, Grid } from '@mui/material'
import Image from 'next/image'
import React from 'react'

export default function TabletSection() {


    const texts = [
        "Watch over 3613 video tutorials and repair your car yourself.",
        "Get advice on DIY replacement of car parts and consumables directly from our experts.",
        "Get to know all the design features of your car and discover all the tricks of parts replacement.",
    ]

    const texts2 = [
        "Get a list of all the tools, care products, and accessories you will need for a particular repair.",
        "Ask AUTODOC specialists and get prompt feedback.",
    ]


    return (
        <Container maxWidth={'xl'} sx={{ mb: 6, padding: 0 }} >
            <MainSectionHeader title='Detailed video tutorials on car repairs' subTitle='They make fixing your car easy.' />
            <Grid container sx={{ mt: { xl: 4, lg: 4, md: 0, sm: 0, xs: 0 } }} rowSpacing={0}>
                <Grid item xl={3} lg={3} sm={12} xs={12} alignContent={'center'} alignItems={'center'}>
                    <CheckList mt={{ xl: 4, lg: 4, md: 0, sm: 0, xs: 0 }} list={texts} minWidth='32px' gap={{ xl: 3, lg: 3, xs: 0, sm: 0, md: 0 }} fontSize={{ lg: 16, xl: 16, md: 14, sm: 14, xs: 14 }} />
                </Grid>


                <Grid item xl={6} lg={6} sm={12} xs={12}>
                    <Box display={'flex'} alignContent={'center'} alignItems={'center'} justifyContent={'center'} justifyItems={'center'} sx={{ px: { xl: 0, lg: 0, md: 6, sm: 6, xs: 6 } }}>
                        <Image alt="" layout="intrinsic" width={576} height={670} src={'/home/images/bg-tablet-1000w.avif'} />
                    </Box>
                </Grid>

                <Grid item xl={3} lg={3} sm={12} xs={12} alignContent={'center'} alignItems={'center'}>
                    <CheckList mt={{ xl: 4, lg: 4, md: 0, sm: 0, xs: 0 }} list={texts2} minWidth='32px' gap={{ xl: 3, lg: 3, xs: 0, sm: 0, md: 0 }} fontSize={{ lg: 16, xl: 16, md: 14, sm: 14, xs: 14 }} />
                </Grid>
            </Grid>

            <Box style={{ display: 'flex', justifyContent: 'center', justifyItems: 'center' }} >
                <LargeButton px={{ xl: 8, lg: 8 }} mt={{ xl: 3, lg: 3, md: 3, sm: 2, xs: 2 }} >GO To Tutorials</LargeButton>
            </Box>
        </Container>
    )
}
