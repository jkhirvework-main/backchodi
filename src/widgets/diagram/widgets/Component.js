
import { setDrawer } from "@/app/GlobalRedux/slice/viewer.sclice";
import Naming from "@/utils/Naming";
import Config from "@/utils/Config";
import Pin from "./Pin";
import Storage from "@/utils/Storage";
import Utils from "@/utils/Utils";
import Loader from "../Loader";
import CompMaster from "./CompMaster";
import BackendHelper from "@/helpers/BackendHelper";
import Wire from "../connection/Wire";
import Manager from "./Manager";
import NCircle from "./NCircle";
import Connector from "./Connector";

class Component extends CompMaster {

    constructor(data, dispatch, rX, rY) {
        super();
        this.data = data;
        this.dispatch = dispatch;


        const { name, type, width, height, uPins, lPins, uId, icon, id, bId, iconScale, iconWidth, iconHeight, direction, angle, oTextWidgets } = data;

        this.oName = name;
        this.rCompId = id;
        // this.name = name.includes('-') ? name : name + ' - ' + Utils.getUId(4);
        this.name = name;
        this.fName = name.split('-')[0];
        this.uId = uId;
        this.icon = icon;
        this.iconScale = iconScale;
        this.iconWidth = iconWidth;
        this.iconHeight = iconHeight;
        this.width = width;
        this.height = height;
        this.uPins = uPins;
        this.lPins = lPins;
        this.type = type ? type : Naming.Component;
        this.id = bId ? bId : Utils.getNanoId();
        this.upperPinsArr = [];
        this.lowerPinsArr = []
        this.upperPinsState = []
        this.lowerPinsState = []
        this.initUpperPinsState = []
        this.initLowerPinsState = []
        this.connectionPool = [];
        this.left = (Config.canvasWidth / 2 - this.width / 2)
        this.top = (Config.canvasHeight / 2 - this.height / 2)
        this.image = null;
        this.rX = rX ? rX : this.left;
        this.rY = rY ? rY : this.top;
        this.direction = direction ? direction : Naming.Top;
        this.textWidgets = [];
        this.angle = angle ? angle : 0;
        this.oTextWidgets = oTextWidgets ? oTextWidgets : [];
        this.componentChecks = [];
        this.dtcIds = data ? data.dtcIds ? data.dtcIds : [] : [];
        this.isEcm = data ? data.isEcm ? data.isEcm : false : false;
        this.terminalSideImage = '';
        this.wireSideImage = '';
        this.isVar = data.isVar;
        this.varId = data.varId;
        this.thumbnail = data.thumbnail;
        this.compCode = data.compCode;
        this.selected = false;
        
        Storage.components.push(this);

        this.setUp();
        setTimeout(() => {
            this.createTextWidgets();
        }, 1000)
    }

    setUp = () => {
        this.createComponent();
        this.setUpImage();

        this.container.id = this.id;

        if (this.data.upperPinsArr) {
            this.data.upperPins.map((pData, index) => {
                this.data.upperPins[index] = { ...pData, ...this.data.upperPinsArr[index] }
            });

            this.data.lowerPins.map((pData, index) => {
                this.data.lowerPins[index] = { ...pData, ...this.data.lowerPinsArr[index] }
            })
        }

        this.setUpPins(this.data.upperPins, Naming.Top);
        this.setUpPins(this.data.lowerPins, Naming.Bottom);
        this.setUpCallback()
    }

    getCompCode = () => {
        return this.oTextWidgets.find(txtWidget => txtWidget.isCompCode)?.text;
    }

    createComponent = () => {
        const component = new Utils.fabric.Rect({
            id: this.id,
            width: this.width,
            height: this.height,
            stroke: 'black',
            strokeWidth: 1,
            fill: 'rgba(255, 255, 255, 1)',
            hasControls: false,
            hasBorders: false,
            type: this.type,
        })


        const group = new Utils.fabric.Group([component], {
            id: this.id,
            left: this.rX,
            top: this.rY,
            hasControls: true,
            type: this.type,
            centeredRotation: true,
            lockMovementX: true,
            lockMovementY: true,
            hasControls: false,

        })


        this.object = group;
        this.container = group;
        this.mRect = component;
        Utils.addToCanvas(group)

        console.log(this.width, this.height, this.container.width, this.container.height)

    }

    setUpImage = () => {
        // const url = BackendHelper.API_URL + this.icon.replace('uploads\\', '',);
        const url = BackendHelper.API_URL + (this.icon ? !this.icon.includes('uploads') ? 'uploads/' + this.icon : this.icon.replace('uploads\\', 'uploads/',) : '');

        // const image = new Utils.fabric.Image(Loader.storeImages.find(imgObj => imgObj.url === url).image);
        Utils.fabric.Image.fromURL(url, (image) => {
            const points = this.container.getCenterPoint();
            image.set({
                originX: 'center',
                originY: 'center',
                left: points.x,
                top: points.y,
                hasControls: false,
                hasBorders: false,
                selectable: false,
                scaleX: this.iconScale,
                scaleY: this.iconScale,
            })
            this.image = image;
            // this.container.addWithUpdate(image);
            Utils.requestRenderAll();
        });
    }

    setUpPins = (pinsObj) => {
        const { left, top } = this.container;


        console.log(pinsObj)

        for (const pObj of pinsObj) {
            const pin = new Pin(pObj, this.dispatch, this).createPin(this.container);
            const nLeft = pin.object.left - left, nTop = pin.object.top - top;


            if (Naming.isTop(pin.direction)) {
                this.upperPinsArr.push(pin);
                this.upperPinsState.push({ left: nLeft, top: nTop })
                this.initUpperPinsState.push({ left: nLeft, top: nTop })
            } else {
                this.lowerPinsArr.push(pin);
                this.lowerPinsState.push({ left: nLeft, top: nTop })
                this.initLowerPinsState.push({ left: nLeft, top: nTop })
            }

            Utils.addToCanvas(pin.object);
        }
    }

    setUpCallback = () => {
        let pointer = null;

        const diff = (num1, num2) => (Math.abs(num1 - num2) < 2);

        this.container.on('mousedown', (e) => {
            // alert(e.pointer.x)
            if (pointer === null) {
                pointer = e.pointer
            }
        })

        this.container.on('mouseup', (e) => {
            if (pointer != null && diff(pointer.x, e.pointer.x) && diff(pointer.y, e.pointer.y)) {
                if (!Utils.diagramViewer.space) {
                    this.select();

                }
            }

            pointer = null;
        })
    }

    createConnectionTypeText = (connection, pin) => {
        const { left, top } = this.getPinXY(pin);
        const textWidget = new Manager.TextWidget({
            visible: false,
            value: connection.type,
            lGap: left - this.container.left,
            tGap: (top + Utils.getVertAdder(Config.pinRadius * 3, pin.direction, true)) - this.container.top,
            sourceComponentId: this.id,
            pin,
            fontSize: 12,
        }, this.dispatch, left, top + Utils.getVertAdder(Config.pinRadius * 3, pin.direction, true));

        textWidget.isConnectionType = true;
        textWidget.isCompCode = false;
        this.textWidgets.push(textWidget);
        textWidget.connectionId = connection.id;
        textWidget.pinId = pin.id;

        Storage.textWidegts.push(textWidget);
    }


    getPinXY = (pin) => {
        const matrix = pin.object.calcTransformMatrix();
        return {
            left: matrix[4] - Wire.hSWidth,
            top: Naming.isTop(pin.direction) ? matrix[5] - (Config.pinRadius + Config.pinStrokeWidth) : matrix[5] + (Config.pinRadius + Config.pinStrokeWidth)
        }
    }

    select = () => {

        Utils.dispatch(setDrawer({ isOpen: true, componentId: this.id }))


        this.getAllEcmConnections()

        for (const component of Storage.components) {
            component.mRect.set({ fill: 'transparent', opacity: 1 });
            component.selected = false;
        }

        for (const connection of Storage.connections) {
            connection.unselect();
        }


        this.mRect.set({ fill: 'blue', opacity: 0.3 })

        const connections = this.connectionPool;


        if (!this.selected) {
            for (const connection of connections) {
                connection.select();
            }

            setTimeout(() => {
                Utils.tmpCompSelected = this;
            }, 50)

            this.selected = true;
        } else {
            this.mRect.set({ fill: 'transparent', opacity: 1 });

            this.selected = false;

            for (const connection of connections) {
                connection.unselect();
            }

            Utils.tmpCompSelected = null;

        }


        Utils.renderAll();
    }

    unSelect = () => {
        this.selected = false;
        Utils.tmpCompSelected = null;

        this.mRect.set({ fill: 'transparent', opacity: 1 });
        Utils.renderAll();
    }

    scaleContainer = (width, height) => {
        this.container.set({
            height,
            width: width,
            scaleX: 1,
            scaleY: 1,
        });

        this.container.setCoords();

        this.mRect.set({
            height: this.container.height,
            width: this.container.width,
            scaleX: 1,
            scaleY: 1,
            left: -((this.container.width) / 2)
        })

        this.mRect.setCoords()

        Utils.requestRenderAll();
    }

    createTextWidgets = () => {
        let num = this.direction === Naming.Top ? 0 : 52

        setTimeout(() => {
            for (const pin of this.upperPinsArr) {
                this.createTextWidget(pin, false, this.showAllPinNums);
                // if (this.isEcm) {
                //     this.createCouplerCodeText(pin);
                // }
            }

            for (const pin of this.lowerPinsArr) {
                this.createTextWidget(pin, false, this.showAllPinNums);
                // if (this.isEcm) {
                //     this.createCouplerCodeText(pin);
                // }
            }


            const compCode = this.createTextWidget(this.compCode, false, true);

        }, num)

    }

    createTextWidget = (pin, log, isVisible = false) => {
        const mult = Naming.isTop(this.direction) ? 4 : 3;
        let rX = 0, rY = 0;

        if (pin instanceof Pin) {
            rX = pin.object.left
            rY = pin.object.top + Utils.getVertAdder(Config.pinRadius * mult, pin.direction);
        } else {
            rX = this.object.left - 30;
            rY = this.object.top + (this.object.height / 2)
        }


        const value = pin instanceof Pin ? pin.pinNum + "" : pin;



        const textWidget = new Manager.TextWidget({ value, canEmpty: true }, this.dispatch, rX, rY);

        // console.log(pin, value, rX, rY, textWidget)

        textWidget.setSourceComponent(this);
        textWidget.set({ lockMovementX: true, lockMovementY: true })


        textWidget.set({ visible: isVisible })


        if (pin instanceof Pin) {
            textWidget.pinId = pin.id;
        } else if (!textWidget.isConnectionType) {
            textWidget.isCompCode = true;
        }

        textWidget.isDef = true;

        this.oTextWidgets.map(txtWidget => {

            if (txtWidget.pinId === textWidget.pinId && !txtWidget.isCouplerCode && !(textWidget.pinId === undefined) && !(txtWidget.pinId === undefined)) {
                textWidget.object.set({ visible: txtWidget.visible, text: txtWidget.text, left: txtWidget.left, top: txtWidget.top, lGap: txtWidget.lGap, tGap: txtWidget.tGap, fontSize: txtWidget.fontSize });
                textWidget.lGap = txtWidget.lGap;
                textWidget.tGap = txtWidget.tGap
                textWidget.object.setCoords()

            } else if (txtWidget.isCompCode && textWidget.isCompCode) {

                textWidget.object.set({ visible: txtWidget.visible, text: txtWidget.text, left: txtWidget.left, top: txtWidget.top, lGap: txtWidget.lGap, tGap: txtWidget.tGap, fontSize: txtWidget.fontSize, angle: txtWidget.angle });
                textWidget.lGap = txtWidget.lGap;
                textWidget.tGap = txtWidget.tGap
                textWidget.object.setCoords()

                textWidget.text.on('mousedown', (e) => {
                    this.select()
                })
            }
        })




        const isTextWidget = this.oTextWidgets.find(txtWidget => txtWidget.pinId === textWidget.pinId && txtWidget.isCouplerCode);

        if (isTextWidget || this.isEcm && pin && pin.couplerCode) {
            const extraGap = Config.couplerCodeGap;

            let rX = 0, rY = 0;
            if (pin instanceof Pin) {
                rX = pin.object.left + extraGap;
                rY = pin.object.top + Utils.getVertAdder(Config.pinRadius * mult, pin.direction);
            }


            const couplerCodeTextWidget = new Manager.TextWidget({ value: pin.couplerCode ? pin.couplerCode : 'C-1' }, this.dispatch, rX, rY);
            couplerCodeTextWidget.setSourceComponent(this);
            couplerCodeTextWidget.set({ lockMovementX: true, lockMovementY: true })
            couplerCodeTextWidget.isCouplerCode = true;
            couplerCodeTextWidget.pinId = pin.id;
            couplerCodeTextWidget.couplerCode = pin.couplerCode;

            this.oTextWidgets.map(txtWidget => {
                if (txtWidget.pinId === couplerCodeTextWidget.pinId) {
                    couplerCodeTextWidget.object.set({ visible: this.isCouplerCodeVisible, text: txtWidget.text, left: txtWidget.left, top: txtWidget.top, lGap: txtWidget.lGap, tGap: txtWidget.tGap, fontSize: txtWidget.fontSize });
                    couplerCodeTextWidget.lGap = txtWidget.lGap;
                    couplerCodeTextWidget.tGap = txtWidget.tGap
                    couplerCodeTextWidget.object.setCoords()
                }
            })
        }

        Utils.renderAll()
        return textWidget;
    }

    getAllEcmConnections = () => {
        const infos = []
        for (const connection of this.connectionPool) {
            if (connection.source instanceof Component && connection.target instanceof Component) {

                let info = null;

                console.log(connection.source, connection.target, connection.sourcePin.pinNum, connection.targetPin.pinNum)
                
                if(connection.target.isEcm){
                    info = {
                        ecmPinNum: connection.targetPin.pinNum,
                        compPinNum: connection.sourcePin.pinNum,
                        type: connection.type
                    }

                    infos.push(info);
                    continue;
                }

                if(connection.source.isEcm){
                    info = {
                        ecmPinNum: connection.sourcePin.pinNum,
                        compPinNum: connection.targetPin.pinNum,
                        type: connection.type
                    }

                    infos.push(info);
                    continue;
                }

                

                
                
            }else {
                const opp = connection.source == this ? connection.target : connection.source;
                const pinNum = connection.source == this ? connection.sourcePin.pinNum : connection.targetPin.pinNum;
                const infoTypes = this.getEndPin(connection, opp, [], pinNum);

                if(infoTypes.length > 0){
                    infos.push(...infoTypes);
                }
            }
        }

       return infos;
       
    }

    getEndPin = (oConnection, component, infoTypes, pinNum) => {
        console.log(component.connectionPool)
        for(const connection of component.connectionPool){
            if(connection != oConnection){

                let info = null;

                if(connection.source instanceof Component && component != connection.source){
                    if(connection.source.isEcm){
                        info = {
                            ecmPinNum: connection.sourcePin.pinNum,
                            compPinNum: pinNum,
                            type: connection.type
                        }
                        infoTypes.push(info);
                        return infoTypes;
                    }
                    
                }

                if(connection.target instanceof Component && component != connection.target){
                    if(connection.target.isEcm){
                        info = {
                            ecmPinNum: connection.targetPin.pinNum,
                            compPinNum: pinNum,
                            type: connection.type
                        }
                        infoTypes.push(info);
                        console.log(info)
                        return infoTypes;
                    }
                    
                }

                const opp = connection.source == component ? connection.target : connection.source;

                if(opp instanceof NCircle || opp instanceof Connector){
                    return this.getEndPin(connection, opp, infoTypes, pinNum);
                }
            }
        }

        return infoTypes;
    }

    getComponentChecks = () => {
        const checks = []

        for(const check of this.componentChecks){
            const {pinData} = check;
            const {sourcePinId, targetPinId} = pinData;

            const {pin: sourcePin, component: sourceComponent} = Storage.findComponentPinById(sourcePinId);
            const {pin: targetPin, component: targetComponent} = Storage.findComponentPinById(targetPinId);


            if(sourceComponent.isEcm){
                checks.push({
                    componentPin: targetPin.pinNum,
                    ecmPin: sourcePin.pinNum,
                    condition: check.condition,
                    typicalValue: check.typicalValue,
                    connected: check.connected,
                    note: check.note
                })
            }

            if(targetComponent.isEcm){
                checks.push({
                    componentPin: sourcePin.pinNum,
                    ecmPin: targetPin.pinNum,
                    condition: check.condition,
                    typicalValue: check.typicalValue,
                    connected: check.connected,
                    note: check.note
                })
            }
        }

        
        return checks;
    }

    getTroubleCodes = () => {
        return this.data.dtcArr;
    }

}

export default Component;