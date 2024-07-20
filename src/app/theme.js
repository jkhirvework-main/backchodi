'use client';
import { Montserrat, Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import Utils from '@/utils/Utils';


const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#152329"
        }
      }
    }
  },
  palette: {
    primary: {
      main: Utils.primaryColor,
    },
    secondary: {
      main: Utils.secondaryColor,
    },
  },
  typography: {
    // fontFamily: roboto.style.fontFamily,
    h4: {
      // fontFamily: roboto.style.fontFamily,
      fontSize: '2.25rem'
    }
  }, breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1350,
    },
  }
});

export default theme;