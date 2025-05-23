import Storage from "@/utils/Storage";
import CompMaster from "./CompMaster";
import Naming from "@/utils/Naming";
import Utils from "@/utils/Utils";
import Wire from "../connection/Wire";
import Config from "@/utils/Config";
import TextWidget from "./TextWidget";


class Connector extends CompMaster {

    constructor(data, dispatch, wire, rX, rY) {
        super()
        this.data = data;
        this.dispatch = dispatch;
        this.wire = wire;
        this.rX = rX;
        this.rY = rY;
        this.direction = wire.direction;
        this.orientation = wire.direction;
        this.type = Naming.Connector;
        this.id = data.id ? data.id : Utils.getNanoId();
        this.connectionPool = [];
        this.recoverPool = [];
        this.targetWireColorObj = null;
        this.textWidget1 = null;
        this.textWidget2 = null;
        this.textWidget3 = null;
        this.isMFReverse = data.isMFReverse ? data.isMFReverse : false;
        this.mFDistance = 20;
        this.connectorCode = data.connectorCode ? data.connectorCode : 'C'
        this.isCodeVisible = data.isCodeVisible ? data.isCodeVisible : false;
        this.MFVisible = data.MFVisible ? data.MFVisible : false;
        this.name = data.name ? data.name : 'Connector - '+this.id.substring(0, 5); 
        this.textWidgets = [];
        this.parent = data.parent ? data.parent : null;
        this.parId = data.parId ? data.parId : null;
        

        this.setUp();
        this.initConnector();

        this.createTextWidgets();

        Storage.connectors.push(this);

        Storage.addWidgetToDispatch(this.dispatch, {
            id: this.id,
            type: this.type
        })
    }

    createTextWidgets = () => {
        const text1Top = Naming.isVertical(this.direction) ? this.object.top - Config.pinRadius - this.mFDistance : this.object.top;
        const text2Top = Naming.isVertical(this.direction) ? this.object.top + Config.pinRadius + this.mFDistance : this.object.top;
        const text3Top = Naming.isVertical(this.direction) ? this.object.top : this.object.top + Config.pinRadius + this.mFDistance;

        const text1Left = Naming.isHorizontal(this.direction) ? this.object.left - Config.pinRadius - this.mFDistance : this.object.left - (Config.pinRadius + this.mFDistance);
        const text2Left = Naming.isHorizontal(this.direction) ? this.object.left + Config.pinRadius + this.mFDistance : this.object.left - (Config.pinRadius + this.mFDistance);
        const text3Left = Naming.isHorizontal(this.direction) ? this.object.left : this.object.left - (Config.pinRadius + this.mFDistance);

        const text1 = new TextWidget({ value: this.isMFReverse ? 'F' : 'M' }, this.dispatch, text1Left, text1Top, this.id);
        const text2 = new TextWidget({ value: this.isMFReverse ? 'M' : 'F' }, this.dispatch, text2Left, text2Top, this.id);
        const text3 = new TextWidget({ value: this.connectorCode }, this.dispatch, text3Left, text3Top, this.id);

        text1.isConnectorText = true;
        text2.isConnectorText = true;
        text3.isConnectorCodeText = true;

        text3.on('changed', (e) => {
            this.connectorCode = text3.object.text;
        })

        this.textWidget1 = text1;
        this.textWidget2 = text2;
        this.textWidget3 = text3;

        if(!this.isCodeVisible){
            this.textWidget3.hide();
        }

        if(!this.MFVisible){
            this.textWidget1.hide();
            this.textWidget2.hide();
        }
    }

    setUp = () => {
        const { stAngle, endAngle } = this.getAngle();
        const connector = new Utils.fabric.Circle({
            radius: Config.pinRadius,
            left: this.rX,
            top: this.rY,
            originX: 'center',
            originY: 'center',
            type: this.type,
            startAngle: stAngle,
            endAngle,
            stroke: 'black',
            strokeWidth: Config.pinStrokeWidth,
            fill: 'white',
            hasControls: false,
            id: this.id,
        })

        if (Naming.isVertical(this.orientation)) {
            connector.set({ lockMovementX: true });
        } else {
            connector.set({ lockMovementY: true });
        }

        this.setObject(connector);
        this.setUpCallback();
        Utils.canvas.add(connector);
    }

    getAngle = () => {
        let stAngle = 0, endAngle = 0;

        switch (this.direction) {
            case Naming.Bottom:
                stAngle = 0;
                endAngle = 180;
                break;
            case Naming.Left:
                stAngle = 90;
                endAngle = 270;
                break;
            case Naming.Top:
                stAngle = 180;
                endAngle = 360;
                break;
            case Naming.Right:
                stAngle = 270;
                endAngle = 90;
                break;
        }

        return { stAngle, endAngle };
    }

    rotate = () => {
        let nStAngle = 0, nEndAngle = 0, nDirection = 0;

        switch (this.direction) {
            case Naming.Bottom:
                nStAngle = 180;
                nEndAngle = 0;
                nDirection = Naming.Top;
                break;
            case Naming.Left:
                nStAngle = 270;
                nEndAngle = 90;
                nDirection = Naming.Right;
                break;
            case Naming.Top:
                nStAngle = 0;
                nEndAngle = 180;
                nDirection = Naming.Bottom;
                break;
            case Naming.Right:
                nStAngle = 90;
                nEndAngle = 270;
                nDirection = Naming.Left;
                break;
        }


        this.direction = nDirection;
        this.object.set({ startAngle: nStAngle, endAngle: nEndAngle });
        Utils.canvas.renderAll();
    }

    initConnector = () => {
        if (this.wire instanceof Wire) {
            const { connection, wire } = Storage.findWireById(this.wire.id);
            wire.lock();

            const nConn = connection.deepClone(this, connection.wires.indexOf(wire) + 1, wire, this.targetWireColorObj);
            nConn.isFinished = true;
            Storage.connections.push(nConn)

            const X2 = Naming.isVertical(wire.orientation) ? wire.X2() : this.object.left;
            const Y2 = Naming.isVertical(wire.orientation) ? this.object.top : wire.Y2();
            wire.set({ x2: X2, y2: Y2 });
            wire.setCoords();


            connection.targetPin = null;
            connection.wires = connection.wires.splice(0, connection.wires.indexOf(wire) + 1)
            if (connection.target) {
                connection.target.connectionPool = connection.target.connectionPool.filter(conn => connection.id != conn.id);
            }

            connection.target = this;
            connection.isFinished = true;

            if (!this.connectionPool.includes(connection)) {
                this.connectionPool.push(connection);
            }
        }

    }

    rotateMF = () => {
        this.isMFReverse = !this.isMFReverse;
        this.textWidget1.object.set({ text: this.textWidget1.text.text == 'M' ? 'F' : 'M' })
        this.textWidget2.object.set({ text: this.textWidget2.text.text == 'F' ? 'M' : 'F' })

        Utils.renderAll();
    }

    setUpCallback = () => {
        this.object.on('mousedown', (e) => {
            if (e.e.ctrlKey) {
                if (Naming.isVertical(this.orientation)) {
                    this.object.set({ lockMovementY: true, lockMovementX: false })
                }
            }

            Utils.dispatchConnnectionFocus(this.dispatch, this.id, Naming.Connector)
        })

        this.object.on('moving', (e) => {
            for (const connection of this.connectionPool) {
                connection.move(this);
            }

            // ComponentUtils.moveTextWidgets(this);

            this.moveText();
        })

        this.object.on('mouseup', (e) => {
            if (Naming.isVertical(this.orientation)) {

                this.object.set({ lockMovementY: false, lockMovementX: true })
            }
        })
    }

    moveWithWire = (wire) => {
        const { connection: nConn } = Storage.findWireById(wire.id);

        if (Naming.isVertical(wire.orientation)) {
            this.object.set({ left: wire.X2() });
        } else {
            this.object.set({ top: wire.Y2() });
        }

        this.object.setCoords();

        for (const connection of this.connectionPool) {
            if (connection != nConn) {
                connection.move(this);
            }
        }
        // ComponentUtils.moveTextWidgets(this);
        this.moveText()
    }

    delete = () => {
        Utils.canvas.remove(this.object);

        const mainConn = Storage.connections.find(connection => connection.target === this);
        const secConn = Storage.connections.find(connection => connection.source === this);

        if (mainConn && secConn) {
            const secWires = secConn.wires, mainWires = mainConn.wires;

            mainConn.wires[mainConn.wires.length - 1].set({ x2: secWires[0].X2(), y2: secWires[0].Y2() });
            mainConn.wires[mainConn.wires.length - 1].subLine.setCoords();

            if (mainConn.wires.length - 1 !== 0) {
                mainConn.wires[mainConn.wires.length - 1].unlock();
            }


            for (let i = 1; i < secWires.length; i++) {
                secWires[i].connection = mainConn;
                secWires[i].subLine.off('mousedown');
                secWires[i].subLine.off('moving');
                secWires[i].subLine.off('mouseup');
                mainConn.setUpCallBack(secWires[i]);

                mainConn.wires.push(secWires[i]);
                secConn.wires[i] = null;
            }

            secWires[0].delete();

            mainConn.target = secConn.target;
            mainConn.targetPin = secConn.targetPin;
            if (mainConn.target) {

                mainConn.target.connectionPool = mainConn.target.connectionPool.filter(connection => connection != secConn);
                secConn.source.connectionPool = mainConn.source.connectionPool.filter(connection => connection != secConn);
                let is = false;
                mainConn.target.connectionPool.map(conn => {
                    if (conn === mainConn) {
                        is = true;
                    }
                })

                if (!is) {
                    mainConn.target.connectionPool.push(mainConn);
                }
            }

            Storage.connections = Storage.connections.filter(connection => connection != secConn);

            Utils.wiringEditor.tempConnection = mainConn

            this.targetWireColorObj = { colors: secConn.wireColors }

            // secConn.delete();
        }

        this.textWidget1.delete();
        this.textWidget2.delete();
        this.textWidget3.delete();

        Storage.connectors = Storage.connectors.filter(connector => connector != this)

        for(const textidget of this.textWidgets){
            textidget.delete();
        }

        return {
            type: Ability.DeleteWidget,
            widgetType: this.type,
            id: this.id,
            targetComp: this,
        }

        

    }

    recover = () => {
        for (const rConn of this.recoverPool) {
            if (!this.connectionPool.includes(rConn)) {
                this.connectionPool.push(rConn);
                rConn.recover()
            }
        }

        if (!Storage.connectors.includes(this)) {
            Storage.connectors.push(this);
        }

        Utils.canvas.add(this.object)
    }


    moveTo = (left, top, gCallback) => {
        this.object.set({ left, top });
        this.object.setCoords();
        for (const connection of this.connectionPool) {
            if (!Utils.staticConnections.find(conn => conn.id === connection.id)) {
                Utils.staticConnections.push(connection);
                connection.move(this, gCallback);
            }
        }
        this.moveText()

    }

    copy = () => {
        const copyObject = {
            type: this.type,
            direction: this.direction,
            targetCom: this,
            id: this.id
        }

        return copyObject;
    }

    moveText = () => {
        const text1Top = Naming.isVertical(this.direction) ? this.object.top - Config.pinRadius - this.mFDistance : this.object.top;
        const text2Top = Naming.isVertical(this.direction) ? this.object.top + Config.pinRadius + this.mFDistance : this.object.top;
        const text3Top = Naming.isVertical(this.direction) ? this.object.top : this.object.top + Config.pinRadius + this.mFDistance;

        const text1Left = Naming.isHorizontal(this.direction) ? this.object.left - Config.pinRadius - this.mFDistance : this.object.left - (Config.pinRadius + this.mFDistance);;
        const text2Left = Naming.isHorizontal(this.direction) ? this.object.left + Config.pinRadius + this.mFDistance : this.object.left - (Config.pinRadius + this.mFDistance);;
        const text3Left = Naming.isHorizontal(this.direction) ? this.object.left : this.object.left - (Config.pinRadius + this.mFDistance);

        this.textWidget1.set({ top: text1Top, left: text1Left })
        this.textWidget2.set({ top: text2Top, left: text2Left })
        this.textWidget3.set({ top: text3Top, left: text3Left })
    }

    hideCode = () => {
        this.isCodeVisible = false;
        this.textWidget3.hide();
    }

    visibleCode = () => {
        this.isCodeVisible = true;
        this.textWidget3.show();
    }

    visibleMF = () => {
        this.MFVisible = true;
        this.textWidget1.show();
        this.textWidget2.show();
    }

    hideMF = () => {
        this.MFVisible = false;
        this.textWidget1.hide();
        this.textWidget2.hide();
    }

}

export default Connector;