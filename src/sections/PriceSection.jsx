import MainSectionHeader from '@/widgets/secondary/MainSectionHeader'
import { Box, Button, Card, Container, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React from 'react'
import CheckIcon from '@mui/icons-material/Check';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['500']
});

const montserrat2 = Montserrat({
    subsets: ['latin'],
    weight: ['400']
});

const montserrat3 = Montserrat({
    subsets: ['latin'],
    weight: ['700']
});

const texts = [
    "50,000 Visitors*",
    "Create Unlimited Widgets",
    "All Widget Types",
    "3rd Party Integrations",
    "Advanced Targeting",
    "2 Websites"
]



const PriceListComponent = ({ list, textColor }) => {
    return (
        <List sx={{ mt: 4 }}>
            {list.map(text => {
                return (
                    <ListItem key={Math.random()}>
                        <ListItemIcon sx={{ minWidth: '38px' }}>
                            <CheckIcon fontSize='small' sx={{ color: '#006AD3' }} />
                        </ListItemIcon>
                        <ListItemText
                            primary={text}
                            primaryTypographyProps={{ style: { color: textColor } }}
                            color={'white'}
                        />
                    </ListItem>
                )
            })}
        </List>
    );
}

const PricingCard = ({ isHeighlighted, planName, price, isYearly = false }) => {

    const textColor = isHeighlighted ? 'white' : 'black';

    return (
        <Grid item xl={3} lg={3} md={4} xs={12} sm={12} sx={{ mt: isHeighlighted ? 0 : { lg: 5, xl: 5, md: 5, sm: 0, xs: 0 } }}>
            <Card variant={isHeighlighted ? '' : 'outlined'} sx={{ textAlign: 'center', borderRadius: 4, backgroundColor: isHeighlighted ? '#152329' : 'white' }}>
                {isHeighlighted ? <Box sx={{ backgroundColor: '#006AD3', py: 1 }}>
                    <Typography color={'white'} sx={{ fontSize: '14px' }}>MOST POPULAR</Typography>
                </Box> : null}

                <Box sx={{ pt: 6, pb: 3, px: 3 }}>
                    <Typography className={montserrat2.className} variant='h6' color={textColor}>{planName}</Typography>
                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} sx={{ mt: 2, }}>
                        <Typography className={montserrat3.className} variant='h4' sx={{}} color={textColor}>₹{price}</Typography>
                        <Typography sx={{ ml: 1, fontSize: 14, fontWeight: 550 }} color={'#ababab'}>/ {isYearly ? 'Year' : 'MONTH'}</Typography>
                    </Box>

                    <PriceListComponent list={texts} textColor={textColor} />

                    <Button variant="conatianed" fullWidth sx={{ backgroundColor: '#006AD3', height: '48px', color: 'white', mt: { xl: 24, lg: 24, md: 24, sm: 6, xs: 6 }, borderRadius: 2 }} >
                        Subscribe
                    </Button>
                </Box>
            </Card>
        </Grid>
    );
}

export default function PriceSection() {

    return (
        <Container maxWidth={'xl'} sx={{ mb: 6,  }}>
            <MainSectionHeader title='What advantages do registered users have?' subTitle='14 days unlimited free trial. No contract or credit card required.' />

            <Box display={'flex'} justifyItems={'center'} alignItems={'center'} >
                <Grid container justifyContent="center" columnSpacing={2} rowSpacing={4} sx={{ mt: 4,px: {xl: 0, lg: 0, xs: 4} }}>
                    <PricingCard isHeighlighted={false} planName={'Essential'} price={0} />
                    <PricingCard isHeighlighted={true} planName={'Pro'} price={499} />
                    <PricingCard isHeighlighted={false} planName={'Bussiness'} price={799} />
                </Grid>
            </Box>

        </Container>
    )
}
