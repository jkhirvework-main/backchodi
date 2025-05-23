import ApiHelper from '@/helpers/ApiHelper'
import { Box, Card, CardContent, CardHeader, Container, Divider, Link, List, ListItem } from '@mui/material'
import React from 'react'
import ChangeVehicleHeading from '../../../(Components)/ChangeVehicleHeading';
import Utils from '@/utils/Utils';

export default async function page({ params, searchParams }) {

    const query = Utils.generateQueryString(searchParams);

    const wiringDiagrams = await ApiHelper.get('/api/wiring-diagrams/' + params.subModuleId + '?' + query);

    return (
        <>
            <Container maxWidth={'xl'}>
                <ChangeVehicleHeading title={'Mahindra Bolero'} desc={'1.2 L'} configOem={wiringDiagrams.configOem}/>

                <Card elevation={0}>
                    <CardHeader title={'Wiring Diagrams'} />

                    <CardContent >
                        <Divider />

                        <Box sx={{ mt: 2 }}>
                            <List>
                                {wiringDiagrams.data.map((diagram, index) => (
                                    <ListItem key={diagram.id}>
                                        <Box>
                                            {/* <Link href={`/diagram/${diagram.id}`} underline='hover' color={'black'} sx={{ fontSize: 16 }}> {diagram.name}</Link> */}
                                            <Link href={`/search/diagrams/diagram?wiringDiagramId=${diagram.wiringDiagramId}`} underline='hover' color={'black'} sx={{ fontSize: 16 }}> {diagram.name}</Link>
                                            {/* <Divider />  */}
                                        </Box>

                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </>
    )
}
