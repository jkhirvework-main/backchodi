'use client'

const { default: styled } = require("@emotion/styled");
const { Box } = require("@mui/material");


const CenteredBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    justifyItems: 'center',


    [theme.breakpoints.down('sm')]: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    [theme.breakpoints.down('xs')]: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    }, [theme.breakpoints.down('md')]: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },[theme.breakpoints.down('lg')]: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
}));

export default CenteredBox;