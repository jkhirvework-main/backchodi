'use client'

import Utils from '@/utils/Utils'
import { Autocomplete, Avatar, Box, Button, Card, CardActionArea, Container, Divider, Grid, Paper, Popper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import PlagiarismIcon from '@mui/icons-material/Plagiarism';
import { Montserrat } from 'next/font/google';
import styled from '@emotion/styled';
import SampleData from '@/utils/SampleData';

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400']
});

const montserrat2 = Montserrat({
    subsets: ['latin'],
    weight: ['700']
});


const TypeOptions = [{
    label: 'Trouble Codes',
    value: 'hello'
}, {
    label: 'Wiring Diagram',
    value: 'hello'
}, {
    label: 'Wiring Diagram',
    value: 'hello'
}]

const SearchCard = ({ title, engine }) => {
    return (
        <Card variant="outlined" sx={{ boxShadow: '0 4px 4px 0 rgba(0, 0, 0, .05)' }}>
            <CardActionArea >
                <Box sx={{ px: 2, pt: 2, pb: 3, }}>
                    <Typography className={montserrat2.className} variant='h6' sx={{ fontSize: 16, mt: 1 }}>{title}</Typography>
                    <Box display={'flex'}>
                        <Typography flexGrow={1} fontSize={14} sx={{ mt: 2 }}>{engine}</Typography>
                        <Typography fontSize={14} sx={{ mt: 2, fontWeight: 500 }} color={Utils.primaryColor}>ABS</Typography>
                    </Box>
                </Box>
            </CardActionArea>
        </Card>
    );

}

const StyledPaper = styled(Paper)(({ theme }) => ({
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTop: '1px solid rgba(0, 0, 0, 0.12)',
    boxShadow: '0 20px 20px rgba(0, 0, 0, .25);',
}));


const StyledPopper = styled(Popper)(({ theme }) => ({
    borderRadius: 0,
    backgroundColor: theme.palette.background.paper,
}));





const StyledAutocomplete = styled(Autocomplete)(({ theme, isMd = false, isLast = false, open: isOpen }) => ({

    '& .MuiOutlinedInput-root': {
        backgroundColor: 'white',
        borderRadius: '4px',

        [theme.breakpoints.up('xs')]: {
            borderTopRightRadius: 4,
            borderBottomRightRadius: isOpen ? 0 : 4,
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: isOpen ? 0 : 4,
        },
        [theme.breakpoints.up('sm')]: {
            borderTopRightRadius: 4,
            borderBottomRightRadius: isOpen ? 0 : 4,
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: isOpen ? 0 : 4,
        },
        [theme.breakpoints.up('md')]: {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,

        },
        [theme.breakpoints.up('lg')]: {
            borderTopRightRadius: isLast ? 4 : 0,
            borderBottomRightRadius: isOpen ? 0 : isLast ? 4 : 0,
            borderTopLeftRadius: (isLast || isMd) ? 0 : 4,
            borderBottomLeftRadius: isOpen ? 0 : (isLast || isMd) ? 0 : 4
        },
        [theme.breakpoints.up('xl')]: {
            borderTopRightRadius: isLast ? 4 : 0,
            borderBottomRightRadius: isOpen ? 0 : isLast ? 4 : 0,
            borderTopLeftRadius: (isLast || isMd) ? 0 : 4,
            borderBottomLeftRadius: isOpen ? 0 : (isLast || isMd) ? 0 : 4
        },
        height: '48px',
        '& fieldset': {
            borderColor: '#ccc',
            borderColor: '#ebebeb',
        },
        '&:hover fieldset': {
            borderColor: '#aaa',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'white',
        }, '& .MuiInputBase-input': {
            padding: '18.5px 20px', // Adjust the padding to match the new height
        },
    },
    '& .MuiAutocomplete-popupIndicator': {
        color: '#006AD3',
    },
    '& .MuiAutocomplete-popupIndicatorOpen': {
        color: '#006AD3',
    }
}));



const CustomAutocomplete = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <StyledAutocomplete renderOption={(props, option, { selected }) => {
            console.log("eh")
            return (
                <Box component="li"  {...props}>
                    <Box flexGrow={1} sx={{py: 0.5}}>
                        {option.label}
                        {/* {TypeOptions.indexOf(option) < TypeOptions.length - 1 && (
                            <Divider />
                        )} */}

                    </Box>


                </Box>
            )
        }} open={isOpen} onOpen={() => setIsOpen(true)} onClose={() => setIsOpen(false)} {...props} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0, } }} />)

}

export default function SearchSection() {



    return (
        <>
            <Box>
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
                                    <CustomAutocomplete
                                        size="small"
                                        options={TypeOptions}
                                        PopperComponent={StyledPopper}
                                        PaperComponent={StyledPaper}

                                        renderInput={(params) => <TextField {...params} placeholder="Type" />}
                                    />
                                </Grid>

                                <Grid item lg={2.5} xs={12} sm={6}>
                                    <CustomAutocomplete
                                        size="small"
                                        isMd={true}
                                        options={TypeOptions}
                                        PopperComponent={StyledPopper}
                                        PaperComponent={StyledPaper}
                                        renderInput={(params) => <TextField {...params} placeholder="Make" />}
                                    />
                                </Grid>

                                <Grid item lg={2.5} xs={12} sm={6}>
                                    <CustomAutocomplete
                                        size="small"
                                        isMd={true}
                                        options={TypeOptions}
                                        PopperComponent={StyledPopper}
                                        PaperComponent={StyledPaper}
                                        renderInput={(params) => <TextField {...params} placeholder="Model" />}
                                    />
                                </Grid>

                                <Grid item lg={2.5} xs={12} sm={6}>
                                    <CustomAutocomplete
                                        size="small"
                                        options={TypeOptions}
                                        isLast={true}
                                        PopperComponent={StyledPopper}
                                        PaperComponent={StyledPaper}
                                        renderInput={(params) => <TextField {...params} placeholder="Year" />}
                                    />
                                </Grid>
                                <Grid item lg={0.25}>
                                </Grid>

                                <Grid item lg={2.25} xs={12}>
                                    <Button variant="conatianed" fullWidth sx={{ backgroundColor: '#006AD3', height: '48px', color: 'white' }} >
                                        Find
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Container>
                </Box>
                <Box sx={{ mt: 4 }}>
                    <Container maxWidth={'xl'}>
                        <Typography className={montserrat.className} variant="h6">Select Vehicles</Typography>

                        <Box sx={{ mt: 2, }}>
                            <Grid container sx={{ pb: 4 }} >
                                {SampleData.searchList.map(item => {
                                    return (
                                        <Grid item xl={3} lg={3} sm={12} xs={12} key={Utils.generateId()} sx={{ py: 1.0, px: { xl: 1, lg: 1, sm: 0, xs: 0 } }}>
                                            <SearchCard title={item.title} engine={item.subHead} />
                                        </Grid>

                                    )
                                })}
                            </Grid>
                        </Box>
                    </Container>
                </Box>
            </Box>

        </>

    )
}
