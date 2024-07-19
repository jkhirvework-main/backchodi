import { AppBar, Box, Container, Paper, Toolbar, Typography } from '@mui/material'
import React from 'react'

export default function SearchAppBar() {
    return (
        <Paper sx={{ mb: 2, borderRadius: 0, boxShadow: '0 0 2px 1px #0003;' }} elevation={0}>
            <Container maxWidth={'xl'}>
                <Toolbar disableGutters={true}>
                    
                </Toolbar>
            </Container>
        </Paper>
    )
}
