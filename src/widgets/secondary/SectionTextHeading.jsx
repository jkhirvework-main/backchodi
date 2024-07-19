import { Typography } from '@mui/material'
import React from 'react'
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400']
});


export default function SectionTextHeading(props) {
  return (
    <Typography className={montserrat.className} sx={{ fontSize: 20}}>{props.text}</Typography>
  )
}
