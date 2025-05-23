import { Card, CardHeader } from '@mui/material'
import React from 'react'
import ComponentCheckTable from './ComponentCheckTable'
import Utils from '@/utils/Utils'


// const preData = [{
//     component: 'Accelerator Position Sensor',
//     ecm_pin: 'K8',
//     condition: 'Ignition On',
//     typical_value: '0V',
//     connected: true,
//     reverse: true,
//     note: 'Test at Component'
// }, {
//     component: 'CK Position Sensor',
//     ecm_pin: 'K8',
//     condition: 'Ignition On',
//     typical_value: '0V',
//     connected: true,
//     reverse: true,
//     note: 'Test at Component'
// }, {
//     component: 'Fuel Injection Sensor',
//     ecm_pin: 'K8',
//     condition: 'Ignition On',
//     typical_value: '0V',
//     connected: true,
//     reverse: true,
//     note: 'Test at Component'
// }, {
//     component: 'APP Sensor',
//     ecm_pin: 'K8',
//     condition: 'Ignition On',
//     typical_value: '0V',
//     connected: true,
//     reverse: true,
//     note: 'Test at Component'
// }]


export default function ComponentCheckSection(rows) {
  return (
    <>
      <Card elevation={0} variant='outlined' sx={{ mt: 4, borderRadius: 2, mb: 8 }}>
        <CardHeader title={'Component Checks'} sx={{ bgcolor: Utils.secondaryColor, }} />

        <ComponentCheckTable rows={rows} />
      </Card>
    </>
  )
}
