
import Utils from "@/utils/Utils";
import CompMaster from "./CompMaster";

class Group  extends CompMaster{

    constructor(data) {
        super()
        this.data = data;
        this.width = data.width ? data.width : 10;
        this.height = data.height ? data.height : 10;
        this.rX = data.left;
        this.rY = data.top;

        this.setUp();
    }

    setUp = () => {
        const groupRect = new Utils.fabric.Rect({
            id: this.id,
            left: this.rX,
            top: this.rY,
            height: this.height,
            width: this.width,
            stroke: 'black',
            strokeWidth: 1.8,
            fill: 'rgba(0, 0, 0, 0)',
            type: this.type,
            noScaleCache: false,
            hasRotatingPoint: false,
            centeredRotation: false,
            lockRotation: true,
            strokeDashArray: [20],
            lockMovementX: true,
            lockMovementY: true,
            hasControls: false,
            hasBorders: false,
            hoverCursor: 'default'
        });

        this.group = groupRect;

        Utils.addToCanvas(groupRect);
    }


}

export default Group;