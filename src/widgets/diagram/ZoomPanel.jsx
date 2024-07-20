'use client'

import { Divider, IconButton, Paper } from '@mui/material'
import { ZoomIn, ZoomOut } from "@mui/icons-material";
import React from 'react'
import Utils from '@/utils/Utils';

export default function ZoomPanel() {

    return (
        <Paper sx={{ position: 'absolute', bottom: {xl: 48, xs: 36}, right: {xl:56, xs: 36}, borderRadius: 100, display: "flex" }}>
            <IconButton onClick={() => { Utils.diagramViewer.zoomIn() }}>
                <ZoomIn />
            </IconButton>
            <Divider orientation="vertical" flexItem variant="middle" sx={{ mx: 1 }} />
            <IconButton onClick={() => { Utils.diagramViewer.zoomOut() }}>
                <ZoomOut  />
            </IconButton>
        </Paper>
    )
}
