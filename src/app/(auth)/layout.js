import Utils from '@/utils/Utils'
import { Box } from '@mui/material'
import React from 'react'

export default function layout({ children }) {
  return (
    <>
      <Box sx={{backgroundColor: Utils.backgroundColor}}>
        {children}
      </Box>

    </>
  )
}
