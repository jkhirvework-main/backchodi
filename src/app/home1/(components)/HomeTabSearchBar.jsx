'use client'

import { getEngines, getModels, getOems, getYears } from '@/app/actions/searchActions';
import NDtcTextField from '@/app/search/components/NDtcTextField';
import NSearchAutoComplete from '@/app/search/components/NSearchAutoComplete';
import SearchAutocomplete from '@/app/search/components/SearchAutoComplete';
import { Autocomplete, Box, Button, Fade, Grid, Stack, Tab, Tabs, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'

const TypeOptions = [{
    label: 'Wiring Diagram',
    value: 1
}, {
    label: 'Trouble Codes',
    value: 2
}]

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
        </div>
    );
}



function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function HomeTabSearchBar() {
    const [typeValue, setTyeValue] = React.useState(0);

    const [oemOptions, setOemOptions] = useState([]);
    const [modelOptions, setModelOptions] = useState([]);
    const [yearOptions, setYearOptions] = useState([]);

    const [dtcOemOptions, setDtcOemOptions] = useState([]);
    const [dtcModelOptions, setDtcModelOptions] = useState([]);

    const [oemValue, setOemValue] = useState(null);
    const [modelValue, setModelValue] = useState(null);
    const [yearValue, setYearValue] = useState(null);

    const [dtcOemValue, setDtcOemValue] = useState(null);
    const [dtcModelValue, setDtcModelValue] = useState(null);

    const [engineList, setEngineList] = useState([]);

    const handleChange = (event, newValue) => {
        setTyeValue(newValue);
    };

    useEffect(() => {
        (async () => {
            const data = await getOems();
            console.log(data)
            setOemOptions(data);
            setDtcOemOptions(data);
        })();
    }, [])

    const oemHandler = async (e, v) => {
        setOemValue(v);

        const data = await getModels(v.value);
        setModelOptions(data);
    }

    const dtcOemHandler = async (e, v) => {
        setDtcOemValue(v);

        const data = await getModels(v.value);
        setDtcModelOptions(data);
    }

    const modelHandler = async (e, v) => {
        setModelValue(v);

        const data = await getYears(v.value);
        setYearOptions(data)
    }

    const yearHeandler = async (e, v) => {
        setYearValue(v);

    }


    const searchHandler = async (e) => {
        if (typeValue === 0 || typeValue === 2) {
            const data = await getEngines(modelValue.value, yearValue.value);
            setEngineList(data);
        } else {
            router.push('/search/dtc')
        }
    }

    return (
        <Box sx={{ mt: 4 }}>
            <Box >
                <Tabs
                    value={typeValue}
                    onChange={handleChange}
                    aria-label="wrapped label tabs example"
                    sx={{
                        mt: 8,
                        ".Mui-selected": {
                            color: '#fffffe',
                            backgroundColor: '#152329',
                        },
                    }}
                    TabIndicatorProps={{
                        style: { display: 'none' }
                    }}

                >

                    <Tab
                        // value="one"
                        label="Wiring"
                        wrapped
                        {...a11yProps(0)}
                        sx={{ borderRadius: 2, borderBottomLeftRadius: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0, backgroundColor: typeValue === 0 ? '#152329' : '#3C4B51', fontSize: 16, fontWeight: 600, color: 'white', px: 4, }}
                    />
                    <Tab
                        // value="two"
                        label="DTC"
                        wrapped
                        {...a11yProps(1)}
                        sx={{ borderRadius: 2, borderBottomLeftRadius: 0, borderTopLeftRadius: 0, borderBottomRightRadius: 0, backgroundColor: typeValue === 1 ? '#152329' : '#3C4B51', fontSize: 16, fontWeight: 600, color: 'white', px: 5 }}
                    />
                </Tabs >
            </Box>

            <Box sx={{ backgroundColor: '#152329', py: 2, px: 2, borderRadius: 2, borderTopLeftRadius: 0 }}>

                <CustomTabPanel value={typeValue} index={0} >
                    <Fade in={typeValue === 0}>
                        <Grid container spacing={2}>
                            <Grid item xl={3.2} lg={3.2} md={6} sm={6}>
                                <NSearchAutoComplete
                                    size="small"
                                    options={oemOptions}
                                    onChange={oemHandler}
                                    value={oemValue}
                                    renderInput={(params) => <TextField {...params} placeholder="Make" />}
                                />
                            </Grid>
                            <Grid item xl={3.2} lg={3.2} md={6} sm={6}>
                                <NSearchAutoComplete
                                    size="small"
                                    options={modelOptions}
                                    onChange={modelHandler}
                                    value={modelValue}
                                    renderInput={(params) => <TextField {...params} placeholder="Model" />}
                                />
                            </Grid>
                            <Grid item xl={3.2} lg={3.2} sm={6}>
                                <NSearchAutoComplete
                                    size="small"
                                    options={yearOptions}
                                    onChange={yearHeandler}
                                    value={yearValue}
                                    renderInput={(params) => <TextField {...params} placeholder="Year" />}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} xl={2.1} lg={2}>
                                <Button sx={{ px: 4, fontSize: 18, ml: 2, mr: 4, backgroundColor: '#0290F7' }} fullWidth variant={'contained'} color={'primary'} onClick={searchHandler}>Search</Button>
                            </Grid>

                        </Grid>
                    </Fade>

                </CustomTabPanel>

                <CustomTabPanel value={typeValue} index={1} >
                    <Fade in={typeValue === 1}>
                        <Grid container spacing={2}>
                            <Grid item xl={3.2} lg={3.2}>
                                <NSearchAutoComplete
                                    size="small"
                                    options={dtcOemOptions}
                                    onChange={dtcOemHandler}
                                    value={dtcOemValue}
                                    renderInput={(params) => <TextField {...params} placeholder="Make" />}
                                />
                            </Grid>
                            <Grid item xl={3.2} lg={3.2}>
                                <NSearchAutoComplete
                                    size="small"
                                    options={dtcModelOptions}
                                    value={dtcModelValue}
                                    renderInput={(params) => <TextField {...params} placeholder="Model" />}
                                />
                            </Grid>
                            <Grid item xl={3.2} lg={3.2}>
                                <NDtcTextField
                                    size="small"
                                    placeholder="P0001"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} xl={2.1} lg={2}>
                                <Button sx={{ px: 4, fontSize: 18, ml: 2, mr: 4, backgroundColor: '#0290F7' }} fullWidth variant={'contained'} color={'#0290F7'} onClick={searchHandler}>Search</Button>
                            </Grid>
                        </Grid>
                    </Fade>

                </CustomTabPanel>

            </Box>
        </Box>
    )
}
