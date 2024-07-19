
import Config from "@/utils/Config";


import Naming from "@/utils/Naming";
import Utils from "@/utils/Utils";
import Circle from "./Circle";
import Storage from "@/utils/Storage";

class BaseWire {

    static BaseWireWidth = 2;
    static baseWireLengthGap =  (Config.baseBackgroundGap * 4)


    constructor(data, intermidators){
        this.data = data;
        
        this.width = Utils.backgroundWidth - BaseWire.baseWireLengthGap;
        this.dispatch = Utils.dispatch;
        this.y = data.y;
        this.intermidators = intermidators;
        this.cIntermidators = [];
        this.isUpper = data.isUpper;
        this.id = data.id ? data.id : Utils.getNanoId();
        this.line = this.createBaseLine();
        this.direction = data.isUpper ? Naming.Top : Naming.Bottom;
        this.orientation = Naming.Left;
        this.type = Naming.BaseWire
        this.object = this.line;

        Storage.baseWires.push(this);

        this.loadIntermidiators()
    }

    loadIntermidiators = () => {
        const nIntermidators = this.intermidators;
        this.intermidators = []
        for (const intermidator of nIntermidators) {
            const circle = new Circle(intermidator, this.dispatch, this, intermidator.x, intermidator.y);
            this.intermidators.push(circle)
        }
    }

    createBaseLine = () => {
        
        const points = [Config.baseBackgroundGap * 2, this.y, this.width + (Config.baseBackgroundGap * 2), this.y];
        const line = new Utils.fabric.Line(points, {
            strokeWidth: BaseWire.BaseWireWidth,
            fill: 'black',
            stroke: 'black',
            selectable: false,
            hasControls: false,
            objectCaching: true,
            type: Naming.BaseWire,
            id: this.id,
            padding: 5,
            isUpper: this.isUpper
        })

        Utils.addToCanvas(line);
        return line;
    }

}

export default BaseWire;