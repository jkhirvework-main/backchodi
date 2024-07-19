
import ApiHelper from "@/helpers/ApiHelper";
import { setDrawer } from "@/app/GlobalRedux/slice/viewer.sclice";
import Naming from "@/utils/Naming";
import Config from "@/utils/Config";
import Pin from "./Pin";
import Storage from "@/utils/Storage";
import Utils from "@/utils/Utils";
import Loader from "../Loader";
import CompMaster from "./CompMaster";

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
        this.isEcm = false;
        this.terminalSideImage = '';
        this.wireSideImage = '';
        this.isVar = data.isVar;
        this.varId = data.varId;
        this.thumbnail = data.thumbnail;
        this.compCode = data.compCode;
        this.selected = false;

        Storage.components.push(this);

        this.setUp();
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
            hasControls: false
        })



        this.object = group;
        this.container = group;
        this.mRect = component;
        Utils.addToCanvas(group)
    }

    setUpImage = () => {
        const url = ApiHelper.API_URL + this.icon.replace('uploads\\', '',);

        const image = new Utils.fabric.Image(Loader.storeImages.find(imgObj => imgObj.url === url).image);
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
        this.container.addWithUpdate(image);
        Utils.requestRenderAll();
    }

    setUpPins = (pinsObj) => {
        const { left, top } = this.container;

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

    select = () => {

        Utils.dispatch(setDrawer({ isOpen: true, componentId: this.id }))

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

    

}

export default Component;