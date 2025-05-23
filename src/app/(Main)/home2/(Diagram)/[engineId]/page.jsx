import { Avatar, Box, Card, CardContent, CardHeader, Container, Divider, Grid, Link, ListItem, Typography } from '@mui/material'
import React from 'react'
import ChangeVehicleHeading from '../(Components)/ChangeVehicleHeading';
import Image from 'next/image';
import { IconEngine } from '@tabler/icons-react';
import ApiHelper from '@/helpers/ApiHelper';
import { TypeComponentListItem } from '../(Components)/TypeComponentListItem';
import Utils from '@/utils/Utils';

export default async function page({searchParams}) {

    const query = Utils.generateQueryString(searchParams);

    const response = await ApiHelper.get('/api/types?'+query);
    

    return (
        <>
            <Container maxWidth={'xl'}>
                <ChangeVehicleHeading  configOem={response.configOem}/>

                <Grid container spacing={3}>
                    <Grid item xl={6} xs={12}>
                        <Card elevation={0}>
                            <Box>
                                <CardHeader title={'Diagrams'} />
                            </Box>

                            <CardContent >
                                <Divider />

                                <Box sx={{ mt: 2 }}>
                                    {response.data.map((type, index) => (
                                        <TypeComponentListItem key={index} type={type.name} id={type.id} query={'?'+query}/>
                                    ))}
                                </Box>

                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xl={6} xs={12}>
                        <Card elevation={0}>
                            <Box>
                                <CardHeader title={'Components'} />
                            </Box>

                            <CardContent >
                                <Divider />

                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

            </Container>
        </>
    )
}
