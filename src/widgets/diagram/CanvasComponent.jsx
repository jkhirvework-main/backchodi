'use client'

import Config from '@/utils/Config';
import Utils from '@/utils/Utils';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import DiagramViewer from './DiagramViewer';

export default function CanvasComponent(props) {
  const [canvasHelper, setCanvasHelper] = useState(null);
  const dispatch = useDispatch();

  Utils.dispatch = dispatch;


  useEffect(() => {
    Config.canvasWidth = Config.getExactNum(window.innerWidth)
    Config.canvasHeight = Config.getExactNum(window.innerHeight - 64);

    Utils.dispatch = dispatch;
    if (canvasHelper === null && !Utils.canvas) {
      const canvasHelper = new DiagramViewer(props.data);
      setCanvasHelper(canvasHelper);
    }
  })
  return (
    <canvas id="canvas" style={{ marginTop: 2 }} />
  )
}
