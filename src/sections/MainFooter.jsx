import Utils from '@/utils/Utils'
import MyLogo from '@/widgets/primary/appBar/MyLogo'
import StyledTextField from '@/widgets/secondary/StyledTextField';
import { Box, Button, Container, Grid, List, ListItem, Stack, Typography } from '@mui/material'
import { Montserrat } from 'next/font/google';
import Link from 'next/link';
import React from 'react'
import shortid from 'shortid';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400']
});

const list1 = [{
  title: 'Company',
  link: '#'
}, {
  title: 'Privacy policy',
  link: '#'
}, {
  title: 'Terms & conditions',
  link: '#'
}, {
  title: 'Cookie settings',
  link: '#'
}]

const list2 = [{
  title: 'MERCEDES-BENZ',
  link: '#'
}, {
  title: 'BMW',
  link: '#'
}, {
  title: 'VW',
  link: '#'
}, {
  title: 'FORD',
  link: '#'
}, {
  title: 'AUDI',
  link: '#'
}, {
  title: 'All car brands',
  link: '#'
}]

const list3 = [{
  title: 'Filters',
  link: '#'
}, {
  title: 'Brake System',
  link: '#'
}, {
  title: 'Suspension and Arms',
  link: '#'
}, {
  title: 'Engine',
  link: '#'
}, {
  title: 'Windscreen Cleaning System',
  link: '#'
}, {
  title: 'Car maintenance',
  link: '#'
}, {
  title: 'Popular Categories',
  link: '#'
}, {
  title: 'Fault codes',
  link: '#'
}, {
  title: 'Price check',
  link: '#'
}]


const FooterList = ({ list }) => {
  return (
    <List sx={{ '& a': { color: '#8A9194', fontSize: '14px' }, '& a:hover': {color: Utils.primaryColor}, padding: 0, mt: 2, }}>
      {list.map(item => {
        return (
          <ListItem key={shortid.generate()} sx={{ px: 0 }}>
            <Link href={item.link} color='white' >{item.title}</Link>
          </ListItem>
        )
      })}
    </List>

  );
}

export default function MainFooter() {
  return (
    <Box sx={{ backgroundColor: Utils.secondaryColor, pt: 4, pb: 4 }}>
      <Container maxWidth={"xl"} >
        <Grid container rowSpacing={4}>
          <Grid item lg={2.5} xl={2.5} sm={12} xs={12} >
            <MyLogo tMax={22} tMin={22} />
          </Grid>

          <Grid item lg={2.25} xl={2.25} sm={6} xs={6}>
            <Typography className={montserrat.className} color={'white'}>AUTODOC CLUB service</Typography>
            <FooterList list={list1} />
          </Grid>

          <Grid item lg={2} xl={2} sm={6} xs={6}>
            <Typography className={montserrat.className} color={'white'}>Popular brands</Typography>
            <FooterList list={list2} />
          </Grid>

          <Grid item lg={2} xl={2} sm={12} xs={12}>
            <Typography className={montserrat.className} color={'white'}>Popular categories</Typography>
            <FooterList list={list3} />
          </Grid>

          <Grid item lg={3} xl={3} sm={12} xs={12}>
            <Typography className={montserrat.className} color={'white'}>Subscribe to our news and updates.</Typography>

            <Box display={'flex'} sx={{ '& a': { color: '#8A9194', fontSize: '14px' }, mt: 4 }}>

              <StyledTextField placeholder="Email" />
              <Button sx={{ backgroundColor: '#006AD3', borderBottomLeftRadius: 0, borderTopLeftRadius: 0, fontSize: 12 }} variant="contained">Subscribe</Button>
            </Box>

            <Stack direction={'row'} spacing={1} mt={2}>
              <Typography color='#8A9194' fontSize={13}>Please note our </Typography>
              <Box sx={{
                '& a': {
                  color: '#006AD3',
                  fontSize: '14px'
                },
              }}>
                <Link href={''} color='#006AD3' fontSize={13}>Privacy Policy</Link>
              </Box>
            </Stack>
          </Grid>

          <Grid item xl={6} >
            <Stack spacing={2} mt={4} direction={'row'}>
              <FacebookIcon color="white" sx={{ color: 'white' }} />
              <YouTubeIcon color="white" sx={{ color: 'white' }} />
              <InstagramIcon color="white" sx={{ color: 'white' }} />
              <XIcon color="white" sx={{ color: 'white' }} />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
