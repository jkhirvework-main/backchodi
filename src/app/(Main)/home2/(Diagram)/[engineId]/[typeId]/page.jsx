import { Box, Card, CardContent, CardHeader, Container, Divider, Grid, Link, List, ListItem } from '@mui/material'
import React from 'react'
import ChangeVehicleHeading from '../../(Components)/ChangeVehicleHeading'
import ApiHelper from '@/helpers/ApiHelper'
import ModuleListItem from './(components)/ModuleListItem';
import Utils from '@/utils/Utils';

export default async function page({ params, searchParams }) {
    const {  typeId } = params;
    const query = Utils.generateQueryString(searchParams)+'&typeId=' + typeId;  

    const nModules = await ApiHelper.get('/api/modules-with-sub-modules?'+query)

    return (
        <>
            <Container maxWidth={'xl'}>
                <ChangeVehicleHeading title={'Mahindra Bolero'} desc={'1.2 L'} configOem={nModules.configOem} />

                <Card elevation={0}>
                    <CardHeader title={'Modules'} />

                    <CardContent sx={{p: 0}}>
                        <Divider />

                        <Box sx={{ mt: 2 }}>
                            <List>
                                {nModules.data.map((module, index) => (
                                    <ModuleListItem module={module} query={query} key={index}/>
                                ))}
                            </List>
                        </Box>

                    </CardContent>
                </Card>
            </Container>
        </>
    )
}
