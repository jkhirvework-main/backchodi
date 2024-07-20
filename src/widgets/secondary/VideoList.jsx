import { Container, Grid } from '@mui/material'
import React from 'react'
import VideoBanner from './VideoBanner';
import SectionIconHeading from './SectionIconHeading';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function VideoList({ videos }) {
    return (
        <Container maxWidth={'xl'} sx={{mb: 6}}>
            <SectionIconHeading icon={<NavigateNextIcon />} text='Top repair guides' />

            <Grid container columnSpacing={1} rowSpacing={3} justifyContent="center" justifyItems={'center'}>
                {
                    videos.map(item => {
                        return (
                            <Grid item lg={3} xl={3} md={6} sm={12} xs={12} key={Math.random()}>
                                <VideoBanner thumbnail={item.thumbnail} heading={item.heading} views={item.views} date={item.date} />
                            </Grid>
                        );
                    })
                }
            </Grid>
        </Container>
    )
}
