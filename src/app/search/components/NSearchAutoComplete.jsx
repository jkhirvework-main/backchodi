'use client'

import Utils from "@/utils/Utils";
import styled from "@emotion/styled";
import { Autocomplete, Box, Paper, Popper } from "@mui/material";
import { useState } from "react";

const StyledAutocomplete = styled(Autocomplete)(({ theme, isMd = false, isLast = false, open: isOpen }) => ({

    '& .MuiOutlinedInput-root': {
        backgroundColor: '#f7f8f9',
        borderRadius: '3px',

        height: '44px',
        '& fieldset': {
            borderColor: 'grey',
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


const NSearchAutoComplete = (props) => {
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

export default NSearchAutoComplete;