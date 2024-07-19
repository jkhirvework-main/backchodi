
import { setWireTooltip } from "@/app/GlobalRedux/slice/connection.slice";
import Config from "@/utils/Config";
import Naming from "@/utils/Naming";
import Storage from "@/utils/Storage";
import Utils from "@/utils/Utils";
import BaseWire from "../widgets/BaseWire";
import Circle from "../widgets/Circle";
import Component from "../widgets/Component";
import Wire from "./Wire";

class Connection {

    constructor(source, target, wireObj, startWireDirection, preData) {
        this.source = source;
        this.target = target;
        this.wireObj = wireObj;
        this.wireColors = wireObj.colors ? wireObj.colors : ['black', 'black'];
        this.preData = preData;
        this.startWireDirection = startWireDirection;
        this.id = preData ? preData.id ? preData.id : Utils.getNanoId() : Utils.getNanoId();
        this.sourcePin = preData ? preData.sourcePin ? preData.sourcePin : null : null;
        this.targetPin = preData ? preData.targetPin ? preData.targetPin : null : null;
        this.reverse = false;
        this.shiftNWire = null;
        this.connMap = [];
        this.wires = [];


        if (source instanceof Circle) {
            if (source.sWire instanceof BaseWire) {
                this.isPowerConnection = true;
            }
        }

        if (target) {
            this.target = target;
            target.connectionPool.push(this)
        }

        this.source.connectionPool.push(this);
        this.setUp()
    }

    setUp = () => {
        const source = this.source;

        if (this.isContainer(this.source)) {
            const first = this.preData.wires[0];
            this.sourceWireDirection = this.source.getWireDirection(first.x1, first.y1);
        }

        if (this.isContainer(this.target)) {
            const last = this.preData.wires[this.preData.wires.length - 1];
            this.targetWireDirection = this.target.getWireDirection(last.x2, last.y2)

            this.loadPreData()
        }

        if (!Storage.connections.includes(this)) {
            Storage.connections.push(this);
        }
    }

    loadPreData = () => {
        const { wires, isFinished } = this.preData;
        this.isFinished = isFinished;
        let index = 0;

        for (const wire of wires) {
            const points = [wire.x1, wire.y1, wire.x2, wire.y2]
            const w = new Wire(points, this.wireColors, this, wire)
            if (index == 0) {
                w.lock();
            }


            this.setUpCallback(w);
            this.wires.push(w);
            wire.
                index++;
        }
    }

    isContainer = object => object instanceof Component;

    setUpCallback = (wire) => {

        wire.on('mouseover', (e) => {
            const { offsetX, offsetY } = e.e;
            for (const wire of this.wires) {
                if (wire.subLine.strokeWidth != 5) {
                    wire.set({ strokeWidth: 3.5 })
                }

            }

            let left = offsetX, top = offsetY, placement = 'top';
            const centerWidth = Config.canvasWidth / 2, centerHeight = Config.canvasHeight / 2;
            const gap = 5;

            if (Naming.isHorizontal(wire.direction)) {
                if (offsetY < centerHeight) {
                    placement = 'bottom';
                    top = offsetY + gap;
                } else {
                    placement = 'top';
                    top = offsetY - gap;
                }
            } else {
                if (offsetX < centerWidth) {
                    placement = 'right';
                    left = offsetX + gap;
                } else {
                    placement = 'left';
                    left = offsetX - gap;
                }
            }

            top += 58

            if (!Utils.diagramViewer.space) {
                Utils.dispatch(setWireTooltip({
                    isOpen: true,
                    left: left,
                    top: top,
                    placement: placement,
                    title: '20 V  (-)'
                    // title: <Typography sx={{fontSize: 13}}>20 V (-)</Typography>
                }))
            }


            Utils.renderAll()
        })

        wire.on('mouseout', (e) => {
            for (const wire of this.wires) {
                if (wire.subLine.strokeWidth === 3.5) {
                    wire.set({ strokeWidth: Wire.strokeWidth })
                }

            }

            Utils.dispatch(setWireTooltip({
                isOpen: false,
            }))

            Utils.renderAll()
        })

        wire.on('touchdrag', (e) => {
            alert('Hello')
        })

        wire.on('mousedown', (e) => {
            this.select();
        })

        Utils.renderAll()
    }

    hide = () => {
        for (const wire of this.wires) {
            if (wire.selected) {
                wire.hide();
            }
        }

        
    }

    show = () => {
        for (const wire of this.wires) {
            wire.show();
        }
    }

    select = () => {
        for (const wire of this.wires) {
            if (wire.selected) {
                wire.unselect();
            } else {
                wire.select();
            }
        }
    }

    unselect = () => {
        for (const wire of this.wires) {
            wire.unselect();
        }
    }

}

export default Connection;