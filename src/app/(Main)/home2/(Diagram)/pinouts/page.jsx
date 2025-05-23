import React from 'react'
import ExpandableTable from './ExpandableTable'
import MyExpandableTable from './MyExpandableTable'
import { Box, Container } from '@mui/material'
import PinOutSection from './components/PinOutSection'

export default function page() {
  return (
    <Box>
      <Container maxWidth={'xl'}>
        <PinOutSection />
      </Container>

    </Box>

  )
}
