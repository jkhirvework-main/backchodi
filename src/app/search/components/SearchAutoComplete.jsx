import Utils from "@/utils/Utils";
import styled from "@emotion/styled";
import { Autocomplete, Box, Paper, Popper } from "@mui/material";
import { useState } from "react";

const StyledAutocomplete = styled(Autocomplete)(({ theme, isMd = false, isLast = false, open: isOpen }) => ({

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
            padding: '18.5px 20px', // Adjust the padding to match the new height
        },
    },
    '& .MuiAutocomplete-popupIndicator': {
        color: '#006AD3',
    },
    '& .MuiAutocomplete-popupIndicatorOpen': {
        color: '#006AD3',
    }
})); 

const StyledPaper = styled(Paper)(({ theme }) => ({
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTop: '1px solid rgba(0, 0, 0, 0.12)',
    boxShadow: '0 20px 20px rgba(0, 0, 0, .25);',
}));


const StyledPopper = styled(Popper)(({ theme }) => ({
    borderRadius: 0,
    backgroundColor: theme.palette.background.paper,
}));


const SearchAutocomplete = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <StyledAutocomplete
            PopperComponent={StyledPopper}
            PaperComponent={StyledPaper}
            renderOption={(props, option, { selected }) => {
                return (
                    <Box component="li"  {...props} key={Utils.getNanoId()}>
                        <Box flexGrow={1} sx={{ py: 0.5 }}>
                            {option.label}
                            {/* {TypeOptions.indexOf(option) < TypeOptions.length - 1 && (
                            <Divider />
                        )} */}

                        </Box>
                    </Box>
                )
            }} open={isOpen} onOpen={() => setIsOpen(true)} onClose={() => setIsOpen(false)} {...props} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0, } }} />)

}

export default SearchAutocomplete;