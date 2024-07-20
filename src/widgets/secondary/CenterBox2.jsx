'use client'

const { default: styled } = require("@emotion/styled");
const { Box } = require("@mui/material");

const CenteredBox2 = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',



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
    },
}));

export default CenteredBox2;