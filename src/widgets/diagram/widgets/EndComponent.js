
import CompMaster from "./CompMaster";
import TextWidget from "./TextWidget";
import Utils from "@/utils/Utils";
import Connection from "../connection/Connection";
import Storage from "@/utils/Storage";
import Manager from "./Manager";

class EndComponent extends CompMaster {

    constructor() {
        super();

        this.connectionPool = [];
        this.direction = Manager. Naming.Top;
        this.targetInstance = null;
        this.nType = Manager.Naming.EndComponent
        this.opposDirection = Manager.Naming.reverseDirection(Manager.Naming.Bottom);
        this.angle = 0;
        this.textWidget = null;
        this.initTxtGap = 30;
        this.textWidgets = [];
        this.isLocked = true;

    }

    init = () => {

    }

    createTextWidget = (data) => {
        this.text = data.text ? data.text : 'Ground'
        this.txtX = data.txtX ? data.txtX : this.object.left;
        this.txtY = data.txtY ? data.txtY : this.object.top - this.initTxtGap;
        const textWidget = new TextWidget({ value: this.text }, Utils.dispatch, this.txtX, this.txtY);
        this.textWidget = textWidget;
        this.textWidget.lGap = textWidget.object.left - this.object.left;
        this.textWidget.tGap = textWidget.object.top - this.object.top;
        this.textWidget.isEndComponentText = true;
        this.textWidgets.push(this.textWidget);

        this.textWidget.on('changed', (e) => {
            
            this.text = this.textWidget.object.text;
        });

        Utils.renderAll();
    }

    getOpposDirection = () => {
        this.opposDirection = Manager.Naming.reverseDirection(this.direction);
        return this.opposDirection;
    }

    setUpCallbacks = () => {

        this.getOpposDirection();
        this.on('mousedown', (e) => {
            Utils.dispatchConnnectionFocus(Utils.dispatch, this.id, this.type)
        })

        this.on('moving', (e) => {
            Connection.singleMovingComps = []
            this.moving = true;

            for (const connection of this.connectionPool) {
                connection.move(this.targetInstance);
            }

            this.textWidget.set({ left: this.object.left + this.textWidget.lGap, top: this.object.top + this.textWidget.tGap });

        })



        this.on('mouseup', (e) => {
            if (this.moving) {
                this.moving = false;

                const { left, top } = this.object;
                const { x, y } = Utils.getExactPoint(left, top);

                this.object.set({ left: x, top: y });

                for (const connection of this.connectionPool) {
                    connection.move(this.targetInstance);
                }

                this.textWidget.set({ left: this.object.left + this.textWidget.lGap, top: this.object.top + this.textWidget.tGap });
                this.txtX = this.textWidget.object.left;
                this.txtY = this.textWidget.object.top;
                Utils.requestRenderAll()
            }
        })
    }

    getEndPoint = () => {
        let x, y;

        switch (this.direction) {
            case Manager.Naming.Top:
                x = this.object.left - Wire.hSWidth;
                y = this.object.top + this.object.height / 2;
                break;
            case Manager.Naming.Left:
                x = this.object.left + this.object.width / 2;
                y = this.object.top - Wire.hSWidth;
                break;
            case Manager.Naming.Right:
                x = this.object.left - this.object.width / 2;
                y = this.object.top - Wire.hSWidth;
                break;
            case Manager.Naming.Bottom:
                x = this.object.left - Wire.hSWidth;
                y = this.object.top - this.object.height / 2;
                break;
        }

        return { x, y }

    }

    moveTo = (left, top, gCallback) => {

        this.object.set({ left, top });
        this.object.setCoords();
        for (const connection of this.connectionPool) {
            connection.move(this, gCallback);
        }

        ComponentUtils.moveTextWidgets(this);
    }

    delete = () => {
        Storage.removeWidgetToDispatch(Utils.dispatch, this)
        for (const conn of this.connectionPool) {
            conn.delete({isTargetCompDel: true});
        }

        if(this.textWidget){
            this.textWidget.delete();

        }
        
        Utils.canvas.remove(this.object);
        Storage.endComponents = Storage.endComponents.filter(endComponent => endComponent.id != this.id);
    }

    getTLParams = () => {
        let { left, top } = this.object;

        if (this.direction != Manager.Naming.Top) {
            this.object.rotate(0);
            Utils.renderAll();

            let { left: nLeft, top: nTop } = this.object;
            left = nLeft;
            top = nTop;

            this.object.rotate(this.angle);
            Utils.renderAll()
        }
        return { left, top }
    }

    copy = () => {
        const copyObject = {
            type: this.type,
            direction: this.direction,
            opposDirection: this.opposDirection,
        }

        Ability.copyObject = copyObject;
        return copyObject
    }

    rotate = () => {
        let angle = 0;
        switch (this.direction) {
            case Manager.Naming.Top:
                angle = 0
                break;
            case Manager.Naming.Right:
                angle = 90;
                break;
            case Manager.Naming.Left:
                angle = 270;
                break;
            case Manager.Naming.Bottom:
                angle = 180;
                break;
        }

        this.object.rotate(angle);
    }

    lock = (isX) => {
        const obj = isX ? { lockMovementX: true } : { lockMovementY: true }
        if (isX) {
            this.lockX = true;
        } else {
            this.lockY = true;
        }
        this.object.set(obj);
    }

    unLock = (isX) => {
        const obj = isX ? { lockMovementX: false } : { lockMovementY: false }
        if (isX) {
            this.lockX = false;
        } else {
            this.lockY = false;
        }
        this.object.set(obj);
    }

    fLock = () => {
        this.isLocked = true;
        this.object.set({ lockMovementX: true, lockMovementY: true });
    }

    fUnlock = () => {
        this.isLocked = false;
        this.object.set({ lockMovementX: false, lockMovementY: false });
    }

}

export default EndComponent;