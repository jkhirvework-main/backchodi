import { Box, Container } from '@mui/material'
import React from 'react'
import DtcComponent from './(components)/DtcComponent'
import ApiHelper from '@/helpers/ApiHelper';
import { getYears } from '@/app/actions/searchActions';

export default async function DtcPage({ searchParams }) {

    const { code, modelId, oemId } = searchParams;
    const years = await getYears(modelId);


    const dtcData = await ApiHelper.get('/dev/dtc?code=' + code + '&modelId=' + modelId + '&oemId=' + oemId);

    return (
        <Box sx={{backgroundColor: '#fff', height: '100%'}}>
            <Container maxWidth={'xl'} >
                <DtcComponent years={years} modelId={modelId} code={code} dtcData={dtcData} />
            </Container>
        </Box>
    )
}
