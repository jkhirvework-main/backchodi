'use client'

import { getEngines } from '@/app/actions/searchActions'
import SearchAutocomplete from '@/app/search/components/SearchAutoComplete'
import SampleData from '@/utils/SampleData'
import Utils from '@/utils/Utils'
import { Autocomplete, Box, Button, Card, CardContent, CardHeader, CircularProgress, Divider, Fade, Grid, List, ListItem, ListItemButton, ListItemText, TextField, Typography } from '@mui/material'
import { Montserrat } from 'next/font/google'
import React, { useEffect, useState } from 'react'

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['900']
})

const componentList = [{
    title: 'Fuel Injection Sensor'
}, {
    title: 'CMP Sensor'
}]

const diagramList = [{
    title: 'EMS'
}, {
    title: 'ABS'
}, {
    title: 'Brake'
}]

const DtcSectionComponent = ({ title, list }) => {
    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant='h6'>{title} :</Typography>
            <Box sx={{ ml: 3, mt: 2 }}>
                <ul>
                    {list.map(item => {
                        return (
                            <li key={Utils.getNanoId()} style={{ marginBottom: 12 }}>{item}</li>
                        )
                    })}
                </ul>
            </Box>
        </Box>
    )
}

const DtcSelectionCard = ({ title, list, mt = 0 }) => {
    return (
        <Card variant='outlined' sx={{ paddingBottom: 0, marginBottom: 0, mt, borderRadius: 2, mx: { xl: 0, xs: 2 } }} >
            <CardHeader title={title} sx={{ bgcolor: Utils.secondaryColor }} titleTypographyProps={{ variant: 'h6' }} />
            <Divider />
            <CardContent sx={{ px: 0, paddingBottom: 0, marginBottom: 0, pt: 0 }}>
                <List  >
                    {list.map((item, index) => {
                        return (
                            <ListItem key={Utils.getNanoId()}>
                                <ListItemButton>
                                    <ListItemText >{item.title}</ListItemText>
                                </ListItemButton>
                                {(index != list.length - 1) && <Divider sx={{ mx: 2 }} />}

                            </ListItem>

                        )
                    })}

                </List>
            </CardContent>
        </Card>
    )
}

const SearchCard = ({ setLoading, years, modelId }) => {

    const [engines, setEngines] = useState([]);
    const [yearValue, setYearValue] = useState(null);

    useEffect(() => {
        (async () => {
            if (modelId && yearValue) {
                const engineList = await getEngines(modelId, yearValue.value);
                console.log(engineList)

                const nList = engineList.reduce((acc, item) => {
                    acc.push({ value: item.id, label: item.name })
                    return acc;
                }, [])


                setEngines(nList)
            }
        })()
    }, [yearValue])


    return (
        <Card variant='outlined' sx={{ paddingBottom: 0, marginBottom: 0, borderRadius: 2, mx: { xl: 0, xs: 2 } }} >
            <CardHeader title={'Select'} sx={{ bgcolor: Utils.secondaryColor }} titleTypographyProps={{ variant: 'h6' }} />

            <CardContent sx={{}}>
                <SearchAutocomplete
                    size="small"
                    options={years}
                    onChange={(event, value) => setYearValue(value)}
                    renderInput={(params) => <TextField {...params} placeholder="Year" />}
                />

                <Box sx={{ mt: 2 }}></Box>

                <SearchAutocomplete
                    size="small"
                    options={engines}
                    renderInput={(params) => <TextField {...params} placeholder="Engine" />}
                />

                <Button size='large' variant='contained' sx={{ mt: 3 }} fullWidth onClick={() => setLoading((prevLoading) => !prevLoading)}>Search</Button>

            </CardContent>

        </Card>
    )
}

const DtcRightSection = ({ years, modelId }) => {
    const [loading, setLoading] = useState(false);
    const [visible, setVisble] = useState('none');

    useEffect(() => {
        if (loading) {
            setTimeout(() => {
                setLoading(false);

                setVisble('block')
            }, 2000)
        }

    }, [loading])

    return (
        <Box>
            <SearchCard setLoading={setLoading} years={years} modelId={modelId} />

            <Box display={'flex'} justifyContent={'center'} justifyItems={'center'} >
                <Fade
                    in={loading}
                    style={{
                        transitionDelay: loading ? '0ms' : '0ms',
                    }}
                    unmountOnExit
                >
                    <CircularProgress sx={{ mt: 8 }} />

                </Fade>
            </Box>
            <Box display={visible}>
                <DtcSelectionCard title={'Components'} list={componentList} mt={4} />
                <DtcSelectionCard title={'Wiring Diagrams'} list={diagramList} mt={4} />
            </Box>

        </Box>
    )
}


export default function DtcComponent({ years, modelId, code, dtcData }) {
    return (
        <Grid container columnSpacing={8} rowSpacing={4} sx={{ mt: { xs: 0, xl: 4 }, mb: 8 }}>
            <Grid item lg={8} xl={8} sm={12} xs={12} >

                <Box display={'flex'} alignContent={'center'} alignItems={'center'}>
                    <Typography className={montserrat.className} sx={{ fontSize: { xl: 28, xs: 22 }, }} flexGrow={1}>{dtcData.title}</Typography>
                    <Autocomplete
                        options={SampleData.Languages}
                        size='small'
                        disablePortal
                        sx={{ width: { xl: 240, xs: 160 } }}
                        value={SampleData.Languages[0]}
                        renderInput={(params) => <TextField {...params} placeholder="Language" />} />
                </Box>

                <Box sx={{ mt: 6 }}>
                    <Typography variant='h6'>Description</Typography>
                    <Typography sx={{ mt: 2 }}>{dtcData.description}</Typography>
                </Box>


                <DtcSectionComponent title={'Possible Symptoms'} list={dtcData.causes} />

                <DtcSectionComponent title={'Possible Causes'} list={dtcData.symptoms} />

                <DtcSectionComponent title={'Possible Solutions'} list={dtcData.solutions} />

            </Grid>

            <Grid item lg={4} xl={4} sm={12} xs={12}>
                <DtcRightSection years={years} modelId={modelId} />
            </Grid>
        </Grid>
    )
}
