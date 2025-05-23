'use client'

import IOSSwitch from '@/widgets/primary/widgets/IOSSwitch';
import CheckList from '@/widgets/secondary/CheckList';
import { Box, Button, Card, Chip, Grid, Stack, Typography } from '@mui/material'
import { Montserrat } from 'next/font/google';
import React from 'react'

const PlanCard = ({ title, price, features, recomended = false, isYearly, yearlyPrice }) => {
    return (
        <>
            {recomended ?

                <Card sx={{ textAlign: 'center', borderRadius: 4, backgroundColor: '#152329' }}>
                    <Box sx={{ backgroundColor: '#006AD3', py: 1 }}>
                        <Typography color={'white'} sx={{ fontSize: '14px' }}>MOST POPULAR</Typography>
                    </Box>
                    <Box sx={{ pt: 6, pb: 3, px: 3 }}>

                        <Typography className={montserrat2.className} variant='h6' color={'white'}>{title}</Typography>
                        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} sx={{ mt: 2, }}>
                            <Typography className={montserrat3.className} variant='h4' sx={{}} color={'white'}>₹{!isYearly ? price : yearlyPrice}</Typography>
                            <Typography sx={{ ml: 1, fontSize: 14, fontWeight: 550 }} color={'#ababab'}>/ MONTH</Typography>
                        </Box >

                        <CheckList mt={4} minWidth='38px' list={features} recomended={recomended} />

                        <Button variant="conatianed" fullWidth sx={{ backgroundColor: '#006AD3', height: '48px', color: 'white', mt: { xl: 24, lg: 24, md: 24, sm: 6, xs: 6 }, borderRadius: 2 }} >
                            Subscribe
                        </Button>
                    </Box>

                </Card> : <Card variant="outlined" sx={{ textAlign: 'center', pt: 6, pb: 3, px: 3, borderRadius: 4 }}>
                    <Typography className={montserrat2.className} variant='h6' >{title}</Typography>
                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} sx={{ mt: 2, }}>
                        <Typography className={montserrat3.className} variant='h4' sx={{}} >₹{!isYearly ? price : yearlyPrice}</Typography>
                        <Typography sx={{ ml: 1, fontSize: 14, fontWeight: 550 }} color={'#ababab'}>/ MONTH</Typography>
                    </Box >

                    <CheckList mt={4} minWidth='38px' list={features} />
                    <Button variant="conatianed" fullWidth sx={{ backgroundColor: '#006AD3', height: '48px', color: 'white', mt: { xl: 24, lg: 24, md: 24, sm: 6, xs: 6 }, borderRadius: 2 }} >
                        Subscribe
                    </Button>
                </Card>}
        </>
    );
}

const montserrat2 = Montserrat({
    subsets: ['latin'],
    weight: ['400']
});

const montserrat3 = Montserrat({
    subsets: ['latin'],
    weight: ['700']
});

export default function PricingComponent({ plans }) {

    const [isYearly, setIsYearly] = React.useState(false);

    const changeaHandler = (e) => {
        setIsYearly(e.target.checked)
    }

    
    return (
        <>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} sx={{ mt: 8 }}>
                <Stack direction={'row'} spacing={2}>
                    <Typography className={montserrat2.className} variant='h6' sx={{ textAlign: 'center', }}>Monthly</Typography>
                    <IOSSwitch onChange={changeaHandler} cheked={isYearly+''} />
                    <Typography className={montserrat2.className} variant='h6' sx={{ textAlign: 'center', opacity: 1 }}>Yearly</Typography>
                    <Chip label="20 % OFF" color="secondary" variant="outlined" />
                </Stack>
            </Box>

            <Box display={'flex'} justifyItems={'center'} alignItems={'center'} sx={{ mt: 6 }}>

                <Grid container justifyContent="center" columnSpacing={2} rowSpacing={2}>
                    {plans.map((plan, index) => {
                        return (
                            <Grid item xl={3} key={plan.id} sx={{ mt: index === 1 ? 0 : { lg: 5, xl: 5, md: 5, sm: 0, xs: 0 } }}>
                                <PlanCard title={plan.title} price={plan.price} features={plan.features} recomended={index == 1} yearlyPrice={plan.yearlyPrice} isYearly={isYearly} />
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>
        </>
    )
}
