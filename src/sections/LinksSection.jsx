import Utils from '@/utils/Utils'
import SectionTextHeading from '@/widgets/secondary/SectionTextHeading'
import { Box, Container, Grid, Link } from '@mui/material'
import React from 'react'



export default function LinksSection({links}) {
    return (
        <Box sx={{ my: 4 }}>
            <Container maxWidth={'xl'}>
                <SectionTextHeading text={'Top repair guides for car models'}></SectionTextHeading>
                <Grid container sx={{ mt: 2 }} rowSpacing={2} >
                    {links.map(item => {
                        return (
                            <Grid item xl={4} lg={4} xs={12} sm={12} justifyContent={'center'} alignItems={'center'} justifyItems={'center'} key={Math.random()}>
                                <Link fontSize={14} underline="none" color={Utils.primaryColor} href={item.link}>{item.title}</Link>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </Box>
    )
}
