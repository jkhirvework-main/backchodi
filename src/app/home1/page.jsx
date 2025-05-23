import CenteredBox from '@/widgets/secondary/CenterBox'
import { Box, Card, CardContent, CardHeader, Container, Divider, Grid, Typography } from '@mui/material'
import { Montserrat } from 'next/font/google';
import React from 'react'
import HomeTabSearchBar from './(components)/HomeTabSearchBar';
import SearchCardHome from './(components)/SearchCardHome';

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400']
});



export default function Home1() {
    return (
        <main style={{ height: '100vh' }}>
            <Container maxWidth={'xl'} sx={{ py: { xl: 16, lg: 16, md: 16, sm: 16, xs: 16, } }}>
                {/* <Grid container columnSpacing={4} rowSpacing={6} alignItems="center" sx={{ my: 2 }}>
                    <Grid item lg={12} xl={12} sm={12} xs={12}>
                        <CenteredBox>
                            <Typography color={'black'} className={montserrat.className} variant="h2" >The Worlds Most  Accurate Unit Testing  Generative AI.</Typography>
                            <Typography variant="body" sx={{ mt: 2 }} color={'grey'}>Contrary to popular belief, Lorem Ipsum is not simply random text. </Typography>


                        </CenteredBox>


                    </Grid>

                    <Grid item xl={1}>

                    </Grid>

                    <Grid item xl={10} lg={8} sm={12} xs={12}>
                        <HomeTabSearchBar />
                    </Grid>

                    <Grid item xl={2}></Grid>

                    <Grid item xl={12} sx={{ mt: 12 }}>
                        <Card elevation={0.5}>
                            <CardHeader title={'Recent Search'} />
                            <Divider />
                            <CardContent sx={{mt: 2, p: 4}}>
                                <Grid container spacing={4}>
                                    <Grid item xl={4}>
                                        <SearchCardHome title={'Wiring Diagram'} />
                                    </Grid>
                                    <Grid item xl={4}>
                                        <SearchCardHome title={'Wiring Diagram'} />
                                    </Grid>
                                    <Grid item xl={4}>
                                        <SearchCardHome title={'Wiring Diagram'} />
                                    </Grid>
                                    <Grid item xl={4}>
                                        <SearchCardHome title={'Wiring Diagram'} />
                                    </Grid>
                                    <Grid item xl={4}>
                                        <SearchCardHome title={'Wiring Diagram'} />
                                    </Grid>
                                    <Grid item xl={4}>
                                        <SearchCardHome title={'Wiring Diagram'} />
                                    </Grid>
                                    <Grid item xl={4}>
                                        <SearchCardHome title={'Wiring Diagram'} />
                                    </Grid>
                                    <Grid item xl={4}>
                                        <SearchCardHome title={'Wiring Diagram'} />
                                    </Grid>
                                    <Grid item xl={4}>
                                        <SearchCardHome title={'Wiring Diagram'} />
                                    </Grid>
                                    <Grid item xl={4}>
                                        <SearchCardHome title={'Wiring Diagram'} />
                                    </Grid>
                                    <Grid item xl={4}>
                                        <SearchCardHome title={'Wiring Diagram'} />
                                    </Grid>
                                    <Grid item xl={4}>
                                        <SearchCardHome title={'Wiring Diagram'} />
                                    </Grid>
                                    <Grid item xl={4}>
                                        <SearchCardHome title={'Wiring Diagram'} />
                                    </Grid>
                                    <Grid item xl={4}>
                                        <SearchCardHome title={'Wiring Diagram'} />
                                    </Grid>
                                    <Grid item xl={4}>
                                        <SearchCardHome title={'Wiring Diagram'} />
                                    </Grid>
                                </Grid>

                            </CardContent>

                        </Card>
                    </Grid>

                </Grid> */}

                <Box display="flex" justifyContent="center" alignItems="center" flexDirection={'column'}>
                    <CenteredBox>
                        <Typography color={'black'} className={montserrat.className} sx={{ typography: { xl: 'h2', lg: 'h3', md: 'h3' } }} >The Worlds Most  Accurate Unit Testing  Generative AI.</Typography>
                        <Typography sx={{ mt: 2, typography: { xl: 'body', lg: 'body', md: 'body1' } }} color={'grey'}>Contrary to popular belief, Lorem Ipsum is not simply random text. </Typography>
                    </CenteredBox>

                    <Box sx={{ width: '80%' }}>
                        <HomeTabSearchBar />
                    </Box>
                </Box>

                <Box sx={{ mt: 8 }}>
                    <CardHeader title={'Recent Search'} sx={{color: 'black'}} />

                    <Grid container spacing={4}>
                        <Grid item xl={4}>
                            <SearchCardHome title={'Wiring Diagram'} />
                        </Grid>

                        <Grid item xl={4}>
                            <SearchCardHome title={'Wiring Diagram'} />
                        </Grid>

                        <Grid item xl={4}>
                            <SearchCardHome title={'Wiring Diagram'} />
                        </Grid>

                        <Grid item xl={4}>
                            <SearchCardHome title={'Wiring Diagram'} />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </main>
    )
}
