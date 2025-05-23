

import { getPricing } from '@/app/user/actions/UserAction'
import IOSSwitch from '@/widgets/primary/widgets/IOSSwitch';
import CheckList from '@/widgets/secondary/CheckList';
import { Box, Button, Card, CardContent, Chip, Container, Grid, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material'
import { Montserrat } from 'next/font/google';
import React from 'react'
import PricingComponent from './(components)/PricingComponent';

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['500']
});

const montserrat2 = Montserrat({
    subsets: ['latin'],
    weight: ['400']
});



const texts = [
    "50,000 Visitors*",
    "Create Unlimited Widgets",
    "All Widget Types",
    "3rd Party Integrations",
    "Advanced Targeting",
    "2 Websites"
]


export default async function PricingPage() {
    const plans = await getPricing();
    


    return (
        <>
            <Container maxWidth={'xl'} sx={{ mt: 12, mb: 8 }}>
                <Card elevation={0}>
                    <CardContent sx={{ p: 4 }}>
                        <Typography className={montserrat.className} variant="h5" sx={{ fontSize: '28px', textAlign: 'center' }}> Choose your plan</Typography>
                        <Typography className={montserrat2.className} color={'#ababab'} variant='h6' sx={{ fontSize: '16px', textAlign: 'center', mt: 3 }}>14 days unlimited free trial. No contract or credit card required.</Typography>

                        <PricingComponent plans={plans} />
                    </CardContent>

                </Card>

            </Container>
        </>
    )
}
