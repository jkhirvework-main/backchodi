'use client'

const { default: styled } = require("@emotion/styled");
const { TextField } = require("@mui/material");

const StyledTextField = styled(TextField)(({ theme }) => ({
    width: '212px',
    '& .MuiOutlinedInput-root': {
        backgroundColor: 'white', // Change background color
        borderRadius: '4px', // Rounded border,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        height: '42px',
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
            padding: '18.5px 20px', // Adjust the padding to match the new height
        },
    },
}));

export default StyledTextField;