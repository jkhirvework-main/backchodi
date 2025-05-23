'use client'

import { closeToast } from '@/app/GlobalRedux/slice/partial.slice';
import { Alert, Snackbar } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function MyToast() {
    const toast = useSelector(state => state.partialSlice.toast);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(closeToast());
    };

    return (
        <Snackbar open={toast.isOpen} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}>
            <Alert
                severity={toast.type}
                variant="filled"
                sx={{ width: '100%' }}
                onClose={handleClose}
            >
                {toast.message ? toast.message : 'This is a success Alert inside a Snackbar!'}
            </Alert>
        </Snackbar>
    )
}
