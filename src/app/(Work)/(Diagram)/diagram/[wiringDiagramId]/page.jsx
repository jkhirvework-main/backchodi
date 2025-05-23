import ApiHelper from '@/helpers/ApiHelper';
import CanvasComponent from '@/widgets/diagram/CanvasComponent';
import DiagramBottomSheet from '@/widgets/diagram/components/DiagramBottomSheet';
import ZoomPanel from '@/widgets/diagram/ZoomPanel';
import DiagramAppBar from '@/widgets/primary/appBar/DiagramAppBar';
import React from 'react'

export default async function DiagramPage({ params }) {
    const { wiringDiagramId } = params;

    const wiringDiagram = await ApiHelper.get('/dev/wiring-diagram/' + wiringDiagramId);

    return (
        <>
            <DiagramAppBar />
            <CanvasComponent data={wiringDiagram} />
            <ZoomPanel />
            <DiagramBottomSheet />
        </>
    )
}
