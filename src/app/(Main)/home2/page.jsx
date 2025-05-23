'use client'

import CenteredBox from '@/widgets/secondary/CenterBox'
import { Box, Card, CardContent, CardHeader, Container, Grid, ListItemButton, Skeleton, Typography } from '@mui/material'
import { Montserrat } from 'next/font/google';
import React, { useState } from 'react'
import styles from '../../../../styles/home/home.module.css';
import HomeTabSearchBar2 from './(components)/HomeTabSearchBar2';
import SearchCardHome from '../../home1/(components)/SearchCardHome';
import Utils from '@/utils/Utils';

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400']
});

const SkeletonComponent = () => {
    return (
        <>
            <Grid container sx={{ mt: 2 }} spacing={2}>
                {[1, 2, 3, 4, 5, 6, 7].map((item) => {
                    return <Grid item xl={4} key={Utils.getNanoId()}>
                    <Box display={'flex'}>
                        <Skeleton variant="rounded" height={56} width={56} sx={{ ml: 5, mr: 2 }} />
                        <Box sx={{ ml: 0, flexGrow: 1 }}>
                            <Skeleton variant="text" height={20} width={200} />
                            <Skeleton variant="text" height={20} width={100} />
                        </Box>

                        <Skeleton variant='rounded' width={60} height={32} sx={{ mr: 2 }} />
                    </Box>

                </Grid>
                    
                })}


            </Grid>

        </>
    );
}

export default function Home2() {

    const [engineList, setEngineList] = useState([]);
    const [oemValue, setOemValue] = useState('');
    const [modelValue, setModelValue] = useState('');
    const [yearValue, setYearValue] = useState('');
    const [dtcValue, setDtcValue] = useState('');
    const [isSkeletonVisible, setIsSkeletonVisible] = useState(false);


    return (
        <main style={{ backgroundColor: '#f9f9fb', height: '100vh' }}>
            <Container maxWidth={'xl'} sx={{ py: { xl: 8, lg: 8, md: 8, sm: 0, xs: 0 }, px: { xs: 0, sm: 0, xl: 3, lg: 3, md: 0 } }}>
                <Card className={styles.card} variant='outlined' sx={{ background: 'linear-gradient(45deg, #0276e8 30%, #0097FE 90%)', backgroundImage: `url(${"https://i.ibb.co/69wmNMX/Frame.png"})`, color: 'white', borderRadius: { xs: 0, sm: 0, xl: 2, lg: 2, md: 2 } }}>
                    <CardContent >

                        <CenteredBox>
                            <Typography className={montserrat.className} sx={{ typography: { xl: 'h2', lg: 'h2', md: 'h2', sm: 'h3', xs: 'h4' } }} >The Ultimate Interactive Automotive Wiring Diagram.</Typography>
                            <Typography  sx={{typography: {xl: 'body1', lg: 'body1', md: 'body1'}, mt: 2,  display: { xs: 'none', sm: 'block', lg: 'block' } }} >Explore every wire and connection with the most advanced interactive wiring diagram. </Typography>
                        </CenteredBox>

                        <Container maxWidth={'lg'}>
                            <Box>
                                <HomeTabSearchBar2 setEngineListPar={setEngineList} setIsSkeletonVisible={setIsSkeletonVisible} />
                            </Box>
                        </Container>

                    </CardContent>
                </Card>
            </Container>


            <Container maxWidth={'xl'}>
                <CardHeader title={'Recent Search'} sx={{ p: 0, m: 0, py: 4 }} />
                <Grid container spacing={3}>

                    {isSkeletonVisible &&
                        <SkeletonComponent />
                    }
                    {engineList.map(item => {
                        return (
                            <Grid item xl={4} lg={6} sm={6} xs={12} key={item.id} sx={{ py: 1.0, px: { xl: 1, lg: 1, sm: 0, xs: 0 } }}>
                                <SearchCardHome description={item.name} parId={item.id} id={item.id} />
                            </Grid>
                        );
                    })}

                </Grid>
            </Container>



        </main>
    )
}
