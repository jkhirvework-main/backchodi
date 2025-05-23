import { useMediaQuery } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";

let isOpen = typeof window !== 'undefined' ? window.innerWidth > 768 : false;

const initialState = {
    drawer: {
        isOpen
    }, toast: {
        isOpen: false,
        type: 'success',
        message: ''
    }
}

export const partialSlice = createSlice({
    name: 'partialsSlice',
    initialState,
    reducers: {
        setDrawerOpen: (state, action) => {
            state.drawer.isOpen = action.payload;
        }, showToast: (state, action) => {
            state.toast.isOpen = true;
            state.toast.type = action.payload.type;
            state.toast.message = action.payload.message;
        }, closeToast: (state) => {
            state.toast.isOpen = false;
        }
    }
})

export const {
    setDrawerOpen, showToast, closeToast
} = partialSlice.actions;

export default partialSlice.reducer;