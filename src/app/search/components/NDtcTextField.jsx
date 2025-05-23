import styled from '@emotion/styled';
import { TextField } from '@mui/material';

const NDtcTextField = styled(TextField)(({ theme, isMd = false, isLast = false, open: isOpen }) => ({
    '& .MuiOutlinedInput-root': {
        backgroundColor: 'white',
        borderRadius: '3px',
        height: '44px',
        '& fieldset': {
            // borderColor: '#ccc',
            // borderColor: '#ebebeb',
            borderColor: 'grey',
        },
        '&:hover fieldset': {
            borderColor: '#aaa',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'grey',
            borderWidth: '1px',
            // borderColor: 'white',
        }, '& .MuiInputBase-input': {
            padding: '12px 20px', // Adjust the padding to match the new height
        },
    }

}));


export default NDtcTextField;