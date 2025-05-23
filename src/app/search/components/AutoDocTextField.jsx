import styled from '@emotion/styled';
import { TextField } from '@mui/material';
import React from 'react'

const AutoDocTextField = styled(TextField)(({ theme, isMd = false, isLast = false, open: isOpen }) => ({
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
            padding: '12px 20px', // Adjust the padding to match the new height
        },
    }

}));


export default AutoDocTextField;