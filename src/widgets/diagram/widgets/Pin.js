
import Config from "@/utils/Config";
import Naming from "@/utils/Naming";
import Utils from "@/utils/Utils";

const { default: CompMaster } = require("../widgets/CompMaster");

class Pin extends CompMaster {

    constructor(data, dispatch, mainComponent) {
        super();
        this.data = data;
        this.dispatch = dispatch;
        this.mainComponent = mainComponent;
        this.type = Naming.Pin;
        this.rDirection = data.rDirection ? data.rDirection : Naming.Top;
        this.angle = data.angle ? data.angle : 0;
        this.isVisible = true



    }

    createPin = (rectCoords) => {
        const { x, y, baseY, id, type, realDirection, componentId, pinNum, isVisible, nId, isPinNumVisible } = this.data;
        const { left, top, width, height } = rectCoords;
        this.direction = realDirection;

        this.id = nId ? nId : Utils.getNanoId();

        const pin = new Utils.fabric.Circle({
            radius: Config.pinRadius,
            left: left + x,
            originX: 'center',
            originY: 'center',
            top: Naming.isTop(realDirection) ? top : top + height,
            startAngle: Naming.isTop(realDirection) ? 180 : 0,
            endAngle: Naming.isTop(realDirection) ? 360 : 180,
            stroke: 'black',
            strokeWidth: Config.pinStrokeWidth,
            fill: 'white',
            objectCaching: false,
            lockMovementY: true,
            lockMovementX: true,
            hasControls: false,
            type: this.type,
            id: this.id,
            direction: realDirection,
            componentId,
            pinNum,
            isVisible,
            visible: isVisible,
            hasBorders: false
        });

        this.x = pin.left;
        this.y = pin.top;
        this.object = pin;
        this.pinNum = pinNum;
        this.id = pin.id
        this.pin = pin;
        this.name = 'Pin - ' + pinNum
        this.isPinNumVisible = isPinNumVisible ? isPinNumVisible : false

        this.setObject(pin);

        return this;
    }

    
    
    getPin = () => {
        return this.pin;
    }

}

export default Pin;