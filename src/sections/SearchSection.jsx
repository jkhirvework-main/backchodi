'use client'

import Utils from '@/utils/Utils'
import { Autocomplete, Avatar, Box, Button, Card, CardActionArea, Container, Divider, Drawer, Grid, Paper, Popper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PlagiarismIcon from '@mui/icons-material/Plagiarism';
import { Montserrat } from 'next/font/google';
import styled from '@emotion/styled';
import SampleData from '@/utils/SampleData';
import SearchAutocomplete from '@/app/search/components/SearchAutoComplete';
import AutoDocTextField from '@/app/search/components/AutoDocTextField';
import Image from 'next/image';
import { getEngines, getModels, getOems, getYears } from '@/app/actions/searchActions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400']
});

const montserrat2 = Montserrat({
    subsets: ['latin'],
    weight: ['700']
});


const TypeOptions = [{
    label: 'Wiring Diagram',
    value: 1
}, {
    label: 'Trouble Codes',
    value: 2
}]

const SearchCard = ({ title, description, parId }) => {
    return (
        <Card variant="outlined" sx={{ boxShadow: '0 4px 4px 0 rgba(0, 0, 0, .05)' }}>
            <CardActionArea component={Link} href={'/search/diagrams?parId=' + parId + '&title=' + title + '&engine=' + description}>
                <Box sx={{ px: 2, pt: 2, pb: 3, }}>
                    <Typography className={montserrat2.className} variant='h6' sx={{ fontSize: 16, mt: 1 }}>{title}</Typography>
                    <Box display={'flex'}>
                        <Typography flexGrow={1} fontSize={14} sx={{ mt: 2 }}>{description}</Typography>
                        <Typography fontSize={14} sx={{ mt: 2, fontWeight: 500 }} color={Utils.primaryColor}>ABS</Typography>
                    </Box>
                </Box>
            </CardActionArea>
        </Card>
    );
}

export default function SearchSection() {


    const [oemOptions, setOemOptions] = useState([]);
    const [modelOptions, setModelOptions] = useState([]);
    const [yearOptions, setYearOptions] = useState([]);

    const [typeValue, setTypeValue] = useState(TypeOptions[0]);
    const [oemValue, setOemValue] = useState(null);
    const [modelValue, setModelValue] = useState(null);
    const [yearValue, setYearValue] = useState(null);

    const [engineList, setEngineList] = useState([]);

    const router = useRouter();

    useEffect(() => {
        (async () => {
            const data = await getOems();
            setOemOptions(data);
        })();
    }, [])

    const typeHandler = async (e, v) => {
        setTypeValue(v);

        const data = await getOems();
        setOemOptions(data);
    }

    const oemHandler = async (e, v) => {
        setOemValue(v);

        const data = await getModels(v.value);
        setModelOptions(data);
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
        if (typeValue === TypeOptions[0] || typeValue === TypeOptions[2]) {
            const data = await getEngines(modelValue.value, yearValue.value);
            setEngineList(data);
        } else {
            router.push('/search/dtc')
        }
    }

    return (
        <>
            <Box sx={{ zIndex: 100, }} display={'flex'}>


  

                <Box sx={{width: '100%'}}>

                    <Box sx={{ backgroundColor: Utils.secondaryColor }}>
                        <Box sx={{ backgroundColor: '#152329', height: { xs: 60, sm: 60, md: 64, lg: 64, xl: 64 } }}></Box>
                        <Container maxWidth={'xl'}>
                            <Box display={'flex'} alignItems={'center'}>
                                <Avatar variant="rounded" sx={{ bgcolor: '#006AD3', width: 36, height: 36 }} >
                                    <PlagiarismIcon fontSize='large' />
                                </Avatar>

                                <Typography className={montserrat.className} color={"white"} sx={{ ml: 2, fontSize: { xs: 20, sm: 20, md: 30, lg: 30 } }}>Car repair manuals and video guides</Typography>
                            </Box>

                            <Box sx={{ pb: 6 }}>
                                <Typography sx={{ mt: 2, fontSize: { xs: 16, sm: 16, md: 16, lg: 16, xl: 16 } }} color={'#ABABAB'}>DIY car repair? Not an issue–with CARCLINIC!</Typography>

                                <Grid container sx={{ mt: 3 }} rowSpacing={2}>
                                    <Grid item lg={2} xs={12} sm={6}>
                                        <SearchAutocomplete
                                            size="small"
                                            options={TypeOptions}
                                            onChange={typeHandler}
                                            value={typeValue}
                                            renderInput={(params) => <TextField {...params} placeholder="Type" />}
                                        />
                                    </Grid>

                                    <Grid item lg={2.5} xs={12} sm={6}>
                                        <SearchAutocomplete
                                            size="small"
                                            isMd={true}
                                            options={oemOptions}
                                            value={oemValue}
                                            onChange={oemHandler}
                                            renderInput={(params) => <TextField {...params} placeholder="Make" />}
                                        />
                                    </Grid>

                                    <Grid item lg={2.5} xs={12} sm={6}>
                                        <SearchAutocomplete
                                            size="small"
                                            isMd={true}
                                            options={modelOptions}
                                            value={modelValue}
                                            onChange={modelHandler}
                                            renderInput={(params) => <TextField {...params} placeholder="Model" />}
                                        />
                                    </Grid>

                                    <Grid item lg={2.5} xs={12} sm={6}>
                                        {typeValue && typeValue.value !== 2 ?
                                            <SearchAutocomplete
                                                size="small"
                                                options={yearOptions}
                                                isLast={true}
                                                value={yearValue}
                                                onChange={yearHeandler}
                                                renderInput={(params) => <TextField {...params} placeholder="Year" />}
                                            /> :
                                            <AutoDocTextField
                                                placeholder='Trouble Code'
                                                sx={{ minWidth: 270 }}
                                                isLast={true}
                                            />
                                        }
                                    </Grid>
                                    <Grid item lg={0.25}>
                                    </Grid>

                                    <Grid item lg={2.25} xs={12}>
                                        <Button onClick={searchHandler} variant="conatianed" fullWidth sx={{ backgroundColor: '#006AD3', height: '48px', color: 'white' }} >
                                            Find
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Container>
                    </Box>

                    {/* <Box display={'flex'} justifyContent={'center'} justifyItems={'center'} sx={{ mt: 16 }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Image src={'/home/svgs/first_search2.svg'} width={200} height={200} />

                        <Typography sx={{ fontSize: 16, fontWeight: 600, mt: 2 }}>Search for first time</Typography>
                        <Typography sx={{ fontSize: 14, mt: 1, maxWidth: 400 }}>Please add your car and enter its details to get the most out of AUTODOC CLUB</Typography>
                    </Box>

                </Box> */}

                    <Box sx={{ mt: 4 }}>
                        <Container maxWidth={'xl'}>
                            <Typography className={montserrat.className} variant="h6">Select Vehicles</Typography>

                            <Box sx={{ mt: 2, }}>
                                <Grid container sx={{ pb: 4 }} >

                                    {engineList.map(item => {
                                        return (
                                            <Grid item xl={3} lg={3} sm={12} xs={12} key={item.id} sx={{ py: 1.0, px: { xl: 1, lg: 1, sm: 0, xs: 0 } }}>
                                                <SearchCard title={yearValue.value + ' ' + oemValue.label + ' ' + modelValue.label} description={item.name} parId={item.id} />
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            </Box>
                        </Container>
                    </Box>
                </Box>

            </Box>

        </>

    )
}
