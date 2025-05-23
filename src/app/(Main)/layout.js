import React from 'react'
import MainSideBar from '../partials/widgets/MainSideBar'
import { Box } from '@mui/material'
import { MainAppBar } from '@/widgets/primary/appBar/MainAppBar'
import Utils from '@/utils/Utils'

const mainWrapperStyle = {
    display: "flex",
    minHeight: "100vh",
    width: "100%",
    backgroundColor: Utils.backgroundColor,
}

const pageWrapperStyle = {
    display: "flex",
    flexGrow: 1,
    paddingBottom: "60px",
    flexDirection: "column",
    zIndex: 1,
    width: "100%",
    backgroundColor: "transparent",
}

export default function layout({ children }) {
    return (
        <div style={mainWrapperStyle}>
            <MainSideBar />

            <Box
                className="page-wrapper"
                sx={{ backgroundColor: Utils.backgroundColor }}
                style={pageWrapperStyle}
            >
                <MainAppBar />
                <Box>
                    <Box sx={{ mt: 8 }}>
                        {children}

                    </Box>

                </Box>
            </Box>

        </div>
    )
}
