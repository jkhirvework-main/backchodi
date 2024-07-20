
import Config from "@/utils/Config";
import Utils from "@/utils/Utils";
import Storage from "@/utils/Storage";
import Naming from "@/utils/Naming";
import Wire from "../connection/Wire";

const { default: CompMaster } = require("./CompMaster");

class Circle extends CompMaster{

    static radius = Config.CircleRadius;
    static gap = Config.CircleRadius;

    constructor(data, dispatch, wire, rX, rY) {
        super();
        this.sWire = wire;
        this.dispatch = dispatch;
        this.data = data;
        this.x = rX;
        this.y = rY;
        this.connectionPool = [];
        this.id = data.id ? data.id : Utils.getNanoId();
        this.direction = data.direction;
        this.orientation = wire.orientation;
        this.type = Naming.Circle;
        this.name = data.name ? data.name : 'Circle ' + Utils.getUId(5);
        this.isPowerConnection = false;

        this.init();
        this.createCircle();
        this.setObject(this.circle)
        Storage.circles.push(this);
    }

    init = () => {
        setTimeout(() => {
            if(this.sWire instanceof Wire){
                const {connection} = Storage.findWireById(this.sWire.id);
    
                this.isPowerConnection = connection.isPowerConnection
            }
        }, 200)
    }

    createCircle = () => {
        const circle = new Utils.fabric.Circle({
            radius: Circle.radius,
            fill: 'black',
            left: this.x,
            top: this.y,
            originX: 'center',
            originY: 'center',
            lockMovementX: true,
            lockMovementY: true,
            hasControls: false,
            id: this.id,
            type: this.type,
            name: this.name,
            strokeWidth: 1,
            stroke: 'white',
            hasBorders: false
        })

        Utils.addToCanvas(circle);
        this.circle = circle;
        // this.setUpMoving()

        return circle;
    }

}

export default Circle;