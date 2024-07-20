import { Button } from '@mui/material'
import { Roboto } from 'next/font/google'
import React from 'react'

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['500']
  })

export default function LargeButton({ children, ml = 0, mt = 4, px = 10, fullwidth = false, extra = {}, textColor = 'white', color='primary' }) {
  return (
    <Button className={roboto.className}  fullWidth={fullwidth} variant="contained" color={color} disableElevation sx={{ width: {xs: '100%', md: 'auto', xl: 'auto'},  height: { md: 56, lg: 56, sm: 56, xs: 56, ...extra }, mt, px, mx: {xl: 0, xs: 3, sm: 3}, ml }} >{children}</Button>
  )
}
