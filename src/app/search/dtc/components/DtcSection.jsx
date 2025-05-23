'use client'

import SampleData from '@/utils/SampleData'
import Utils from '@/utils/Utils'
import { Autocomplete, Box, Button, Card, CardContent, CardHeader, CircularProgress, Fade, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Typography } from '@mui/material'
import { Montserrat } from 'next/font/google'
import React, { useEffect, useState } from 'react'
import SearchAutocomplete from '../../components/SearchAutoComplete'
import LargeButton from '@/widgets/secondary/LargeButton'
import BackendHelper from '@/helpers/BackendHelper'


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
        <Box>
            {list.length > 0 &&
                <Box sx={{ mt: 4 }}>
                    <Typography variant='h6'>{title} :</Typography>
                    <Box sx={{ ml: 3, mt: 2 }}>
                    <ul>
                        {list.map(item => {
                            return (
                                <li style={{ marginBottom: 12 }} key={Utils.getNanoId()}>{item}</li>
                            )
                        })}
                    </ul>
                </Box>
            </Box>}
        </Box>

    )
}

const DtcSelectionCard = ({ title, list, mt = 0 }) => {
    return (
        <Card variant='outlined' sx={{ paddingBottom: 0, marginBottom: 0, mt, borderRadius: 2, mx: { xl: 0, xs: 2 } }} >
            <CardHeader title={title} sx={{ bgcolor: Utils.secondaryColor }} titleTypographyProps={{ variant: 'h6' }} />

            <CardContent sx={{ px: 0, paddingBottom: 0, marginBottom: 0 }}>
                <List  >
                    {list.map(item => {
                        return (
                            <ListItemButton key={Utils.getNanoId()}>
                                <ListItemText >{item.title}</ListItemText>
                            </ListItemButton>
                        )
                    })}

                </List>
            </CardContent>
        </Card>
    )
}

const SearchCard = ({ setLoading }) => {



    return (
        <Card variant='outlined' sx={{ paddingBottom: 0, marginBottom: 0, borderRadius: 2, mx: { xl: 0, xs: 2 } }} >
            <CardHeader title={'Select'} sx={{ bgcolor: Utils.secondaryColor }} titleTypographyProps={{ variant: 'h6' }} />

            <CardContent sx={{}}>
                <SearchAutocomplete
                    size="small"
                    options={SampleData.SelectTypeOptions}
                    renderInput={(params) => <TextField {...params} placeholder="Year" />}
                />

                <Box sx={{ mt: 2 }}></Box>

                <SearchAutocomplete
                    size="small"
                    options={SampleData.SelectTypeOptions}
                    renderInput={(params) => <TextField {...params} placeholder="Engine" />}
                />

                <Button size='large' variant='contained' sx={{ mt: 3 }} fullWidth onClick={() => setLoading((prevLoading) => !prevLoading)}>Search</Button>

            </CardContent>

        </Card>
    )
}

const DtcRightSection = () => {
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
            <SearchCard setLoading={setLoading} />

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

export default function DtcSection({ data }) {

    const [nData, setNData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (data) {
                const nData = await BackendHelper.get(`/api/single-dtc?id=${data.id}`)

                setNData(nData)
            }
        }
        fetchData();
    }, [data])

    return (
        <Grid container columnSpacing={8} rowSpacing={4} sx={{ mt: { xs: 0, xl: 4 }, mb: 8 }}>
            <Grid item lg={12} xl={12} sm={12} xs={12} >
                <Box display={'flex'} alignContent={'center'} alignItems={'center'}>
                    <Typography className={montserrat.className} sx={{ fontSize: { xl: 28, xs: 22 }, }} flexGrow={1}>{nData && nData.code} - {nData && nData.title}</Typography>
                    <Autocomplete
                        options={SampleData.Languages}
                        size='small'
                        disablePortal
                        sx={{ width: { xl: 240, xs: 160 }, ml: 6 }}
                        
                        value={SampleData.Languages[0]}
                        renderInput={(params) => <TextField {...params} placeholder="Language" />} />
                </Box>

                {nData &&
                    <Box>
                        <Box sx={{ mt: 6 }}>
                            <Typography variant='h6'>Description</Typography>
                            <Typography sx={{ mt: 2 }}>{nData.description}</Typography>
                        </Box>

                        <DtcSectionComponent title={'Possible Symptoms'} list={nData.symptoms} />

                        <DtcSectionComponent title={'Possible Causes'} list={nData.causes} />

                        <DtcSectionComponent title={'Possible Solutions'} list={nData.solutions} />
                    </Box>

                }

            </Grid>

            {/* <Grid item lg={4} xl={4} sm={12} xs={12}>
                <DtcRightSection />
            </Grid> */}
        </Grid>
    )
}