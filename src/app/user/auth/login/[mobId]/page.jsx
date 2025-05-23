import Utils from '@/utils/Utils'
import PageContainer from '@/widgets/mui/container/PageConatiner'
import CustomCheckbox from '@/widgets/mui/elements/CustomCheckbox'
import CustomFormLabel from '@/widgets/mui/elements/CustomFormLabel'
import CustomTextField from '@/widgets/mui/elements/CustomTextField'
import MyLogo from '@/widgets/primary/appBar/MyLogo'
import { Box, Button, FormControlLabel, FormGroup, Grid, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import RegisterComponent from './components/RegisterComponent'

export default function page({ mobId }) {

  console.log(mobId)


  return (
    <PageContainer title="Login Page" description="this is Sample page" >
      <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh', }}>
        <Grid
          item
          xs={12}
          sm={12}
          lg={7}
          xl={8}
          sx={{
            position: 'relative',
            '&:before': {
              content: '""',
              // background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
              backgroundColor: Utils.secondaryColor,
              backgroundSize: '400% 400%',
              animation: 'gradient 15s ease infinite',
              position: 'absolute',
              height: '100%',
              width: '100%',
              opacity: '1',
            },
          }}
        >
          <Box position="relative">
            <Box p={3}>
              <MyLogo />
            </Box>
            <Box
              alignItems="center"
              justifyContent="center"
              height={'calc(100vh - 75px)'}
              sx={{
                display: {
                  xs: 'none',
                  lg: 'flex',
                },
              }}
            >
              <Image
                src={"/images/backgrounds/login-bg.svg"}
                alt="bg" width={500} height={500}
                style={{
                  width: '100%',
                  maxWidth: '500px',
                  maxHeight: '500px',
                }}
              />
            </Box>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          lg={5}
          xl={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box p={4}>
            <Typography fontWeight="700" variant="h3" mb={1}>Welcome to Carclinic Fix</Typography>
            <Typography variant="subtitle1" color="textSecondary" mb={1}>Your Personal Support</Typography>

            <RegisterComponent />


          </Box>
        </Grid>
      </Grid>
    </PageContainer>
  )
}
