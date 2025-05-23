import { useState } from "react";

const { default: styled } = require("@emotion/styled");
const { Autocomplete, Paper, Popper, Box } = require("@mui/material");

const StyledAutocomplete = styled(Autocomplete)(({ theme, isMd = false, isLast = false, open: isOpen }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: 2,
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

const FormAutocomplete = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <StyledAutocomplete
            PopperComponent={StyledPopper}
            PaperComponent={StyledPaper}
            renderOption={(props, option, { selected }) => {
                return (
                    <Box component="li"  {...props}>
                        <Box flexGrow={1} sx={{ py: 0.5 }}>
                            {option.label}

                        </Box>
                    </Box>
                )
            }} 
            open={isOpen} 
            onOpen={() => setIsOpen(true)} 
            onClose={() => setIsOpen(false)} 
            {...props} 
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, } }} />
    )
};

export default FormAutocomplete;