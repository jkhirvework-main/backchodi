'use client'

import { getEngines, getModels, getOems, getYears } from '@/app/actions/searchActions';
import NDtcTextField from '@/app/search/components/NDtcTextField';
import NSearchAutoComplete from '@/app/search/components/NSearchAutoComplete';
import SearchAutocomplete from '@/app/search/components/SearchAutoComplete';
import { addHistory } from '@/app/user/actions/UserAction';
import Utils from '@/utils/Utils';
import styled from '@emotion/styled';
import { Autocomplete, Box, Button, Card, CardMedia, Fade, Grid, Stack, Tab, Tabs, TextField, useMediaQuery, withStyles } from '@mui/material'
import { useRouter } from 'next/navigation';
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

export default function HomeTabSearchBar2({ setEngineListPar, setIsSkeletonVisible }) {
    const [typeValue, setTyeValue] = React.useState(0);
    const router = useRouter();

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
    const [dtcValue, setDtcValue] = useState('');

    const [engineList, setEngineList] = useState([]);

    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

    const handleChange = (event, newValue) => {
        setTyeValue(newValue);
    };

    useEffect(() => {
        (async () => {
            const data = await getOems();
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

    const dtcModelHandler = async (e, v) => {
        setDtcModelValue(v);
    }

    const yearHeandler = async (e, v) => {
        setYearValue(v);

    }


    const searchHandler = async (e) => {
        if (typeValue === 0 || typeValue === 2) {
            setIsSkeletonVisible(true);
            const data = await getEngines(modelValue.value, yearValue.value);
            setIsSkeletonVisible(false);
            setEngineList(data);
            setEngineListPar(data);

            Utils.saveToLocalStorageJ('searchData', { oem: oemValue.label, model: modelValue.label, year: yearValue.label, modelId: modelValue.value, year: yearValue.value, oemId: oemValue.value })

        } else {
            const data = await addHistory(Utils.getFromLocalStorageJ('user').id, 'dtc', { oem: dtcOemValue.label, model: dtcModelValue.label, dtc: dtcValue, modelId: dtcModelValue.value, oemId: dtcOemValue.value });
            Utils.saveToLocalStorageJ('searchData', { oem: dtcOemValue.label, model: dtcModelValue.label, modelId: dtcModelValue.value, oemId: dtcOemValue.value, dtc: dtcValue })
            router.push('/home2/dtc?modelId=' + dtcModelValue.value + '&code=' + dtcValue + '&oemId=' + dtcOemValue.value)
        }
    }

    return (
        <Box sx={{ mt: 4 }}>
            <Box >
                <Tabs
                    value={typeValue}
                    onChange={handleChange}
                    aria-label="wrapped label tabs example"
                    variant={lgUp ? "standard" : "fullWidth"}
                    sx={{
                        mt: 8,
                        ".Mui-selected": {
                            backgroundColor: '#ffffff',
                        },
                    }}
                    TabIndicatorProps={{
                        style: { display: 'none' }
                    }}
                >

                    <Tab

                        label="Wiring"
                        fullWidth
                        wrapped
                        {...a11yProps(0)}
                        sx={{ borderRadius: 2, borderBottomLeftRadius: 0, borderTopRightRadius: 0, backgroundColor: '#e5f1fc', borderBottomRightRadius: 0, fontSize: 16, fontWeight: 600, px: 4, }}
                    />
                    <Tab
                        label="DTC"
                        fullWidth
                        wrapped
                        {...a11yProps(1)}
                        sx={{ borderRadius: 2, borderBottomLeftRadius: 0, borderTopLeftRadius: 0, backgroundColor: '#e5f1fc', borderBottomRightRadius: 0, fontSize: 16, fontWeight: 600, px: 5 }}
                    />
                </Tabs >
            </Box>

            <Box sx={{ backgroundColor: '#ffffff', py: 3, px: 2, borderRadius: 2, borderTopLeftRadius: 0, borderTopRightRadius: { sm: 0, xs: 0, md: 2, lg: 2, xl: 2 } }}>

                <CustomTabPanel value={typeValue} index={0} >
                    {/* <Fade in={typeValue === 0}> */}
                    <Grid container spacing={2} rowSpacing={3} sx={{ py: { xs: 2, xl: 0, lg: 0, sm: 2 } }}>
                        <Grid item xl={3.2} lg={3.2} md={6} sm={6} xs={12} >
                            <NSearchAutoComplete
                                size="small"
                                options={oemOptions}
                                onChange={oemHandler}
                                value={oemValue}
                                renderInput={(params) => <TextField {...params} placeholder="Make" sx={{ backgroundColor: '#f7f8f9' }} />}
                            />
                        </Grid>
                        <Grid item xl={3.2} lg={3.2} md={6} sm={6} xs={12}>
                            <NSearchAutoComplete
                                size="small"
                                options={modelOptions}
                                onChange={modelHandler}
                                value={modelValue}
                                renderInput={(params) => <TextField {...params} placeholder="Model" />}
                            />
                        </Grid>
                        <Grid item xl={3.2} lg={3.2} md={6} sm={6} xs={12}>
                            <NSearchAutoComplete
                                size="small"
                                options={yearOptions}
                                onChange={yearHeandler}
                                value={yearValue}
                                renderInput={(params) => <TextField {...params} placeholder="Year" />}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} xl={2.1} lg={2} >
                            <Button sx={{ px: 4, fontSize: 18, ml: { xs: 0, lg: 2, xl: 2 }, mr: 4 }} fullWidth variant={'contained'} color={'primary'} onClick={searchHandler}>Search</Button>
                        </Grid>

                    </Grid>
                    {/* </Fade> */}

                </CustomTabPanel>

                <CustomTabPanel value={typeValue} index={1} >
                    <Grid container spacing={2} rowSpacing={3} sx={{ py: { xs: 2, xl: 0, lg: 0, sm: 2 } }}>
                        <Grid item xl={3.2} lg={3.2} xs={12} md={6}>
                            <NSearchAutoComplete
                                size="small"
                                options={dtcOemOptions}
                                onChange={dtcOemHandler}
                                value={dtcOemValue}
                                renderInput={(params) => <TextField {...params} placeholder="Make" />}
                            />
                        </Grid>
                        <Grid item xl={3.2} lg={3.2} xs={12} md={6}>
                            <NSearchAutoComplete
                                size="small"
                                options={dtcModelOptions}
                                value={dtcModelValue}
                                onChange={dtcModelHandler}
                                renderInput={(params) => <TextField {...params} placeholder="Model" />}
                            />
                        </Grid>
                        <Grid item xl={3.2} lg={3.2} xs={12} md={6}>
                            <NDtcTextField
                                size="small"
                                placeholder="P0001"
                                fullWidth
                                value={dtcValue}
                                onChange={(e) => setDtcValue(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} xl={2.1} lg={2}>
                            <Button sx={{ px: 4, fontSize: 18, ml: { xs: 0, lg: 2, xl: 2 }, mr: 4 }} fullWidth variant={'contained'} color={'primary'} onClick={searchHandler}>Search</Button>
                        </Grid>
                    </Grid>

                </CustomTabPanel>

            </Box>
        </Box>
    )
}
