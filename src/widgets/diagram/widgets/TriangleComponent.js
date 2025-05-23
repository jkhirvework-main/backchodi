import EndComponent from "./EndComponent";

const { default: Naming } = require("@/utils/Naming");
const { default: Storage } = require("@/utils/Storage");
const { default: Utils } = require("@/utils/Utils");

class TriangleComponent extends EndComponent {

    constructor(data, rX, rY) {
        super();

        this.angle = 0;
        this.direction = data.direction ? data.direction : Naming.Top;
        this.opposDirection = data.opposDirection ? data.opposDirection : Naming.reverseDirection(Naming.Bottom)
        this.id = data.id ? data.id : Utils.getNanoId();
        this.moving = false;
        this.type = Naming.TriangleComponent;
        this.targetInstance = this;
        this.name = 'Triangle - ' + this.id.substring(0, 4);
        this.rX = rX;
        this.rY = rY;
        
        this.setUp();
        this.init();
        this.createTextWidget(data);

        Storage.endComponents.push(this);
        Storage.addWidgetToDispatch(Utils.dispatch, this);

        
    }

    setUp = () => {
        let angle = 0;

        switch (this.direction) {
            case Naming.Top:
                angle = 0
                break;
            case Naming.Right:
                angle = 90;
                break;
            case Naming.Left:
                angle = 270;
                break;
            case Naming.Bottom:
                angle = 180;
                break;
        }

        var triangle = new Utils.fabric.Triangle({
            width: 25, height: 25, fill: 'black',
            left: this.rX,
            top: this.rY,
            hasControls: false,
            hasBorders: false,
            angle,
            originX: 'center',
            originY: 'center',
            type: this.type,
            direction: this.direction,
            id: this.id,
            nType: Naming.EndComponent,
            lockMovementX: true,
            lockMovementY: true,
        });


        this.angle = angle;

        this.object = triangle;
        Utils.canvas.add(triangle);

        this.setUpCallbacks();
    }

}

export default TriangleComponent;