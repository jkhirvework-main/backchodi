'use client'

import { getModels, getOems } from '@/app/actions/searchActions'
import NDtcTextField from '@/app/search/components/NDtcTextField'
import NSearchAutoComplete from '@/app/search/components/NSearchAutoComplete'
import NTextFieldMultiLine from '@/app/search/components/NTextFieldMultiLine'
import { addInfoRequest } from '@/app/user/actions/UserAction'
import CustomFormLabel from '@/widgets/mui/elements/CustomFormLabel'
import { Box, Button, Card, CardContent, CardHeader, Container, Divider, Grid, Link, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'



export default function RequestPage() {

    const [oemOptions, setOemOptions] = useState([]);
    const [modelOptions, setModelOptions] = useState([]);
    const [yearOptions, setYearOptions] = useState([]);

    const [oemValue, setOemValue] = useState(null);
    const [modelValue, setModelValue] = useState(null);
    const [yearValue, setYearValue] = useState(null);
    const [engineValue, setEngineValue] = useState(null);
    const [moduleValue, setModuleValue] = useState(null);
    const [descriptionValue, setDescriptionValue] = useState(null);

    const date = new Date();

    if (yearOptions.length === 0) {
        for (let i = 1998; i <= date.getFullYear(); i++) {
            const year = { label: i, value: i };
            yearOptions.push(year);
        }
    }


    useEffect(() => {
        (async () => {
            const data = await getOems();
            setOemOptions(data);
        })();
    }, [])

    const oemHandler = async (e, v) => {
        setOemValue(v);

        const data = await getModels(v.value);
        setModelOptions(data);
    }

    const modelHandler = async (e, v) => {
        setModelValue(v);


    }

    return (
        <main>
            <Container maxWidth={'md'} >
                <Box >
                    <Card elevation={0} sx={{ mt: 12 }}>
                        <CardHeader title={'Request Information'} sx={{ mx: 2, mt: 1 }} />
                        <Divider sx={{ mx: 3 }} />

                        <CardContent sx={{ p: 4 }}>

                            <Grid container spacing={3} >
                                <Grid item xs={12} sm={6}>
                                    <CustomFormLabel sx={{ mt: 0 }}>Make</CustomFormLabel>

                                    <NSearchAutoComplete
                                        size="small"
                                        options={oemOptions}
                                        onChange={oemHandler}
                                        value={oemValue}
                                        renderInput={(params) => <TextField {...params} placeholder="Make" />}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <CustomFormLabel sx={{ mt: 0 }}>Model</CustomFormLabel>

                                    <NSearchAutoComplete
                                        size="small"
                                        options={modelOptions}
                                        onChange={modelHandler}
                                        value={modelValue}
                                        renderInput={(params) => <TextField {...params} placeholder="Model" />}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <CustomFormLabel sx={{ mt: 0 }}>Year</CustomFormLabel>

                                    <NSearchAutoComplete
                                        size="small"
                                        options={yearOptions}
                                        onChange={(e, v) => setYearValue(v)}
                                        value={yearValue}
                                        renderInput={(params) => <TextField {...params} placeholder="Year" />}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <CustomFormLabel sx={{ mt: 0 }}>Engine</CustomFormLabel>
                                    <NDtcTextField
                                        size="small"
                                        placeholder="1.2 L (Turbo) 4 Cylinder"
                                        fullWidth
                                        value={engineValue}
                                        onChange={(e) => setEngineValue(e.target.value)}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12}>
                                    <CustomFormLabel sx={{ mt: 0 }}>Module</CustomFormLabel>
                                    <NDtcTextField
                                        size="small"
                                        placeholder="Ecm, Abs, Tcm, etc"
                                        fullWidth
                                        value={moduleValue}
                                        onChange={(e) => setModuleValue(e.target.value)}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12}>
                                    <CustomFormLabel sx={{ mt: 0 }}>Description</CustomFormLabel>
                                    <NTextFieldMultiLine
                                        size="small"
                                        placeholder="Also available data in hindi language."
                                        fullWidth
                                        multiline
                                        rows={4}
                                        value={descriptionValue}
                                        onChange={(e) => setDescriptionValue(e.target.value)}
                                    />
                                </Grid>
                            </Grid>

                            <Stack direction="row-reverse" spacing={1} sx={{ my: 3 }}>

                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={async () => {
                                        const data = { make: oemValue.value, model: modelValue.value, year: yearValue.value + '', engine: engineValue, module: moduleValue, description: descriptionValue };

                                        const response = await addInfoRequest(data);
                                        console.log(response)
                                    }}
                                >
                                    Submit
                                </Button>
                                <Button variant="outlined" componentt={Link} href='home2/'>
                                    Cancel
                                </Button>

                            </Stack>

                        </CardContent>
                    </Card>
                </Box>

            </Container>
        </main>
    )
}
