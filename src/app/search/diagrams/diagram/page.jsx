// 'use client'

import ApiHelper from '@/helpers/ApiHelper'
// import prisma from '@/utils/db/db'
import CanvasComponent from '@/widgets/diagram/CanvasComponent'
import DiagramBottomSheet from '@/widgets/diagram/components/DiagramBottomSheet'
import ZoomPanel from '@/widgets/diagram/ZoomPanel'
import DiagramAppBar from '@/widgets/primary/appBar/DiagramAppBar'
import React from 'react'
import ComponentPinOutDrawer from './component-pinouts/ComponentPinOutDrawer'
import ComponentChecksDrawer from './component-checks/ComponentChecksDrawer'
import DtcDrawer from './trouble-codes/DtcDrawer'
import SingleDtcDrawer from '../../dtc/components/SingleDtcDrawer'


export default async function DiagramPage({ searchParams }) {
  // let data = await ApiHelper.get('/load-wiring-diagram?id=' + 2,)
  const { wiringDiagramId } = searchParams;

  console.log(wiringDiagramId)
  
  // const data = (await prisma.wiringDiagram.findMany({ where: { parId } }))[0];
  
  const data = await ApiHelper.get('/api/load-wiring-diagram-from-backend?wiringDiagramId=' + wiringDiagramId)
  console.log(data, 'data')

  return (
    <div>
      <DiagramAppBar />
      <CanvasComponent data={data} />
      <ZoomPanel />
      <ComponentPinOutDrawer />
      <ComponentChecksDrawer />
      <DtcDrawer />
      <SingleDtcDrawer />
      <DiagramBottomSheet />
    </div>
  )
}
