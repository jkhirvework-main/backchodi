import prisma from '@/utils/db/db'
import Utils from '@/utils/Utils';
import FixAppBar from '@/widgets/primary/appBar/FixAppBar'
import { Box, Card, CardActionArea, Container, Grid, Typography } from '@mui/material'
import { Montserrat } from 'next/font/google';
import Link from 'next/link';
import React from 'react'

const montserrat2 = Montserrat({
    subsets: ['latin'],
    weight: ['700']
});


export default async function page() {



    const searchHistory = await prisma.searchHistory.findMany({ take: 10 });

    const groupedData = searchHistory.reduce((acc, current) => {
        const date = current.time.toLocaleString().split(',')[0];
        if (!acc[date]) {
            acc[date] = [];
        }

        acc[date].push(current);
        return acc;
    }, {});

    const SearchCard = ({ row }) => {
        const { title, description, time, targetObj } = row;
        const sp = time.toLocaleString().split(',')[1].trim().split(' ');
        const nT = sp[0].substring(0, sp[0].lastIndexOf(":")) + ' ' + sp[1];


        return (
            <Card variant="outlined" sx={{ boxShadow: '0 4px 4px 0 rgba(0, 0, 0, .05)' }}>
                <CardActionArea component={Link} href={'/search/diagrams/diagram?parId=' + targetObj.subModuleId }>
                    <Box sx={{ px: 2, pt: 2, pb: 3, }}>
                        <Box display={'flex'}>
                            <Typography className={montserrat2.className} flexGrow={1} variant='h6' sx={{ fontSize: 16, mt: 1 }}>{title}</Typography>
                            <Typography className={montserrat2.className} sx={{ fontSize: 14, mt: 1 }} >{nT}</Typography>
                        </Box>

                        <Box display={'flex'}>
                            <Typography flexGrow={1} fontSize={14} sx={{ mt: 2 }}>{description}</Typography>
                            <Typography fontSize={14} sx={{ mt: 2, fontWeight: 500 }} color={Utils.primaryColor}>{targetObj.moduleName}</Typography>
                        </Box>
                    </Box>
                </CardActionArea>
            </Card>
        );
    }


    const DateComponent = ({ date, object: rows }) => {

        return (
            <>
                <Typography variant='h6' sx={{}}>{date}</Typography>

                <Grid container sx={{ mt: 2 }} spacing={2}>

                    {rows.map(row => {
                        return <Grid item xl={4} lg={4} sm={12} xs={12} key={row.id}>
                            <SearchCard row={row} />
                        </Grid>

                    })}

                </Grid>
            </>

        );
    }


    return (
        <>
            <FixAppBar />

            <Container maxWidth={'xl'}>
                {Object.keys(groupedData).map((date, index) => {
                    return (
                        <DateComponent date={date} object={groupedData[date]} key={index} />
                    );
                })}

            </Container>
        </>
    )
}
