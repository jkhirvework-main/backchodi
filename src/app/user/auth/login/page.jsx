import PageContainer from '@/widgets/mui/container/PageConatiner'
import MyLogo from '@/widgets/primary/appBar/MyLogo'
import { Box, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import AuthLogin from './components/AuthLogin'
import Utils from '@/utils/Utils'

export default function page() {
  return (
    // <main >
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

              <AuthLogin
                title="Welcome to Carclinic Fix"
                subtext={
                  <Typography variant="subtitle1" color="textSecondary" mb={1}>
                    Your Personal Support
                  </Typography>
                }
              />
              {/* <AuthLogin
              title="Welcome to Modernize"
              subtext={
                <Typography variant="subtitle1" color="textSecondary" mb={1}>
                  Your Admin Dashboard
                </Typography>
              }
              subtitle={
                <Stack direction="row" spacing={1} mt={3}>
                  <Typography color="textSecondary" variant="h6" fontWeight="500">
                    New to Modernize?
                  </Typography>
                  <Typography
                    component={Link}
                    href="/auth/auth1/register"
                    fontWeight="500"
                    sx={{
                      textDecoration: 'none',
                      color: 'primary.main',
                    }}
                  >
                    Create an account
                  </Typography>
                </Stack>
              }
            /> */}
            </Box>
          </Grid>
        </Grid>
      </PageContainer>
    // </main>

  )
}
