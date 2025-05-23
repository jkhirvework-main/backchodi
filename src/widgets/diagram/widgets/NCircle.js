import Utils from "@/utils/Utils";
import Circle from "./Circle";
import Naming from "@/utils/Naming";
import CompMaster from "./CompMaster";
import Config from "@/utils/Config";
import TextWidget from "./TextWidget";
import Wire from "../connection/Wire";
import Storage from "@/utils/Storage";

class NCircle extends CompMaster {

    static ahmDirection = null;

    constructor(data, dispatch, wire, rX, rY) {
        super();

        this.sWire = wire;
        this.dispatch = dispatch;
        this.data = data;
        this.x = rX;
        this.y = rY;
        this.wire = wire;
        this.orientation = wire.direction;
        this.connectionPool = [];
        this.direction = data.direction;
        this.code = data.code ? data.code : 'C-1';
        this.isPowerConnection = false;
        this.type = Naming.NCircle;
        this.id = data.id ? data.id : Utils.getNanoId();
        this.name = data.name ? data.name : 'NCircle ' + Utils.getUId(5);
        this.isVisible = data.isVisible === undefined ? true : data.isVisible;
        this.mFDistance = 20;
        this.isCodeVisible = data.isCodeVisible === undefined ? true : data.isCodeVisible;
        this.textProperties = data.textProperties ? data.textProperties : { tGap: 0, lGap: 0 }

        this.setUp();
        this.initNCircle();
        this.setUpCallback();

        Storage.nCircles.push(this);
        Storage.addWidgetToDispatch(dispatch, this);

        Utils.renderAll()
    }

    setUp = () => {

        const circle = new Utils.fabric.Circle({
            radius: Circle.radius,
            fill: this.isVisible ? 'black' : '#aabbcc',
            left: this.x,
            top: this.y,
            originX: 'center',
            originY: 'center',
            lockMovementX: !Naming.isHorizontal(this.sWire.direction),
            lockMovementY: Naming.isHorizontal(this.sWire.direction),
            // lockMovementX: true,
            // lockMovementY: true,
            hasControls: false,
            id: this.id,
            type: this.type,
            name: this.name,
            strokeWidth: 1,
            stroke: 'white'
        })


        this.isLocked = true;
        this.object = circle;

        this.createTextWidgets();

        Utils.canvas.add(circle);
        this.circle = circle;
    }


    getEndPoint = () => {
        const { left, top } = this.object;
        return { x: left, y: top };
    }

    createTextWidgets = () => {

        let text3Top = Naming.isVertical(this.direction) ? this.object.top : this.object.top + Config.pinRadius + this.mFDistance;
        let text3Left = Naming.isHorizontal(this.direction) ? this.object.left : this.object.left - (Config.pinRadius + this.mFDistance);

        if (this.textProperties.lGap !== 0 || this.textProperties.tGap !== 0) {
            // text3Top = Naming.isVertical(this.direction) ? this.object.top + this.textProperties.tGap : text3Top;
            // text3Left = Naming.isHorizontal(this.direction) ? this.object.left + this.textProperties.lGap : text3Left;

            text3Top = this.object.top + this.textProperties.tGap
            text3Left = this.object.left + this.textProperties.lGap
        }

        console.log(this.textProperties.tGap)

        const text3 = new TextWidget({ value: this.code, ...this.textProperties }, this.dispatch, text3Left, text3Top, this.id);

        text3.isNCircleCodeText = true;

        if (!this.isCodeVisible) {
            text3.hide();
        }

        text3.on('changed', (e) => {
            this.code = text3.object.text;
        })


        this.textWidget3 = text3;
        this.textWidget3.sourcComponent = this;
    }

    getCustomCoords = () => {
        return {
            x: this.object.left,
            y: this.object.top
        }
    }

    moveText = () => {
        const text3Top = Naming.isVertical(this.direction) ? this.object.top : this.object.top + Config.pinRadius + this.mFDistance;
        const text3Left = Naming.isHorizontal(this.direction) ? this.object.left : this.object.left - (Config.pinRadius + this.mFDistance);




        if (this.textWidget3.lGap === 0 && this.textWidget3.tGap === 0) {
            this.textWidget3.set({ top: text3Top, left: text3Left })
        } else {
            // const left = Naming.isHorizontal(this.direction) ? text3Left + this.textWidget3.lGap : text3Left;
            // const top = Naming.isVertical(this.direction) ? text3Top + this.textWidget3.tGap : text3Top;

            const left = this.object.left + this.textWidget3.lGap;
            const top = this.object.top + this.textWidget3.tGap;
            this.textWidget3.set({ top, left })
        }
    }

    initNCircle = () => {
        if (this.wire instanceof Wire) {
            const { connection, wire } = Storage.findWireById(this.wire.id);
            wire.lock();


            const nConn = connection.deepClone(this, connection.wires.indexOf(wire) + 1, wire, this.targetWireColorObj);
            nConn.secConnId = this.id;
            connection.mainConnId = this.id;

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
            nConn.isFinished = true;

            if (!this.connectionPool.includes(connection)) {
                this.connectionPool.push(connection);
            }

        }
    }

    setUpCallback = () => {
        

    }

    moveWithWire = (wire, x, y) => {
        // return;
        if (NCircle.ahmDirection == null) {
            NCircle.ahmDirection = this.direction;
        }


        // if (this.direction === NCircle.ahmDirection) {

        const index = wire.connection.wires.indexOf(wire);

        const { connection: nConn } = Storage.findWireById(wire.id);

        // console.log(wire.connection.wires, index, )
        // if (index === wire.connection.wires.length - 1 || index === 0) {
        if ((index === wire.connection.wires.length - 1 || index === 0) && wire.connection.wires.length == 1) {
            this.isPreConnection = true;
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


            this.moveText();
            Utils.requestRenderAll();
        }
        // }



    }

    addPrev = () => {
        this.prev = this.object.clone();
    }

    lock = () => {
        this.object.set({ lockMovementX: true, lockMovementY: true });
        Utils.renderAll()
    }

    fOUnlock = () => {
        if (Naming.isVertical(this.orientation)) {
            this.object.set({ lockMovementX: false, lockMovementY: true });
        } else {
            this.object.set({ lockMovementX: true, lockMovementY: false });
        }

        this.isLocked = false;

        Utils.renderAll()
    }

    fOLock = () => {
        if (Naming.isVertical(this.orientation)) {
            this.object.set({ lockMovementX: true, lockMovementY: false });
        } else {
            this.object.set({ lockMovementX: false, lockMovementY: true });

        }

        this.isLocked = true;
        Utils.renderAll()
    }

    onlyCircleMove = (left, top) => {
        const obj = {};

        if (NCircle.ahmDirection == null) {
            NCircle.ahmDirection = this.direction;
        }

        if (this.direction === NCircle.ahmDirection) {
            if (!Naming.isVertical(this.orientation)) {
                obj.top = top;
            } else {
                obj.left = left;
            }

            this.object.set(obj);
            this.object.setCoords();


            for (const connection of this.connectionPool) {
                if (!connection.isMoved) {
                    connection.isMoved = true;
                    if (connection.source !== this || connection.target !== this) {
                        connection.move(this);
                    }

                    connection.isMoved = false;
                }
            }

            this.moveText();
            Utils.requestRenderAll();
        }
    }



    hideCircle = () => {
        this.circle.set({ fill: '#aabbcc' });
        this.isVisible = false;
        Utils.canvas.renderAll();
    }

    visibleCircle = () => {
        this.circle.set({ fill: 'black' });
        this.isVisible = true;
        Utils.canvas.renderAll();
    }

    visibleCode = () => {
        this.textWidget3.show();
        this.isCodeVisible = true;
    }

    hideCode = () => {
        this.textWidget3.hide();
        this.isCodeVisible = false;
    }




}

export default NCircle;