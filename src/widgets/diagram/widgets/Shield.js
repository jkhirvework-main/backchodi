import Utils from "@/utils/Utils";
import CompMaster from "./CompMaster";
import Storage from "@/utils/Storage";
import Manager from "./Manager";

class Shield extends CompMaster {

    constructor(data, clientX, clientY) {
        super();

        this.data = data;
        this.clientX = clientX;
        this.clientY = clientY;
        
        this.type = Manager.Naming.Shield;
        this.connections = data.connections ? data.connections : []; 
        this.id = data.id ? data.id : Utils.getNanoId();
        this.name = data.name ? data.name : 'Shield - '+this.id.substring(0, 5);    
        this.scaling = false;
        this.strokeWidth = 1
        // this.elipseWidth = data.width ? Utils.getSExactPoint(data.width / 2) -  this.strokeWidth/2: 25;
        this.elipseWidth = data.width ? data.width/2 : 25;
        console.log(data.width, this.elipseWidt,data.width/2, this.strokeWidth/2)
        this.shieldHeight = data.height ? data.height : 60;
        this.wires = data.wires ? data.wires : [];  
        this.direction = data.direction ? data.direction : Manager.Naming.Right;
        this.orientation = this.direction;
        this.connectionPool = []
        this.wiresAndConnections = []
        this.code = data.code ? data.code : 'S'
        this.isCodeVisible = data.isCodeVisible ? data.isCodeVisible : false;
        this.subType = Manager.Naming.NormalShield;
        this.elipseHeight = data.height ? data.height : 8;

        this.preLoadMerge();
        this.createShield();

        Storage.addWidgetToDispatch(Utils.dispatch, this);
    }

    createShield = () => {
        const  color = 'black', strokeDashArray = [5];
        // const elipseHeight = 8
        // this.elipseHeight = elipseHeight;

        var shield = new Utils.fabric.Rect({
            top: this.clientY,
            left: this.clientX,
            width: this.elipseWidth*2,
            height: this.   elipseHeight*1,
            fill: '',
            rx: 5,
            rY: 5,
            stroke: color,
            strokeWidth: this.strokeWidth,
        });


        shield.setControlsVisibility({ tl: false, tr: false, bl: false, br: false, mtr: false, });

        this.shield = shield;
        this.shield.set({
            type: Manager.Naming.Shield,
            id: this.id,
        })

        console.log(shield,shield.width, shield.height)
        Utils.canvas.add(shield);

        this.setObject(shield);
        this.setUpCallBack();
        Storage.shields.push(this);
        return this;
    }

    getCustomCoords = () => {
        return {
            x: this.object.left,
            y: this.object.top,
            width: this.object.width,
            height: this.object.height
        }
    }

    preLoadMerge = () => {
    
        for(const connection of this.connections){
            connection.shields.push(this);
        }


        for(const wire of this.wires){ 
            wire.shields.push(this);
        }

        // this.shield.set({ lockMovementX: true})
        // this.shield.setCoords();
    }

    setUpCallBack = () => {


        this.object.on('mousedown', (e) => {
            // Utils.dispatchConnnectionFocus(Utils.dispatch, this.id, Manager.Naming.Shield)
        })

        this.object.on('scaling', (e) => {
            // this.scaleShield(this.shield.width * this.shield.scaleX, this.shield.height * this.shield.scaleY)
        })

        this.object.on('moving', (e) => {
            for(const connection of this.connectionPool){
                connection.move(this);
            }
        })

        this.object.on('mouseup', (e) => {

            // if (this.scaling) {
            //     let { width, height } = this.object;
            //     this.scaleShield(width, height);
            //     this.scaling = false;
            //     return;
            // }

            // const { left, top } = this.object;
            // const { x: eX, y: eY } = Utils.getExactPoint(left, top);

            // this.object.set({ left: eX, top: eY });
            // this.object.setCoords();

            // for(const connection of this.connectionPool){
            //     connection.move(this);
            // }

            // Utils.renderAll()
        })

    }

    scaleShield = (width, height) => {
        this.scaling = true;

        this.shield.set({
            height,
            width: width,
            scaleX: 1,
            scaleY: 1,
            rx: 5,
            ry: 5,
        });

        // this.eli_1.set({
        //     rx: width / 2,
        //     ry: this.elipseHeight,
        //     top: - (height / 2),
        //     left: - (width / 2)
        // });

        // this.eli_2.set({
        //     rx: width / 2,
        //     ry: this.elipseHeight,
        //     top: (height / 2) - this.elipseHeight,
        //     left: - (width / 2)
        // });

        // this.line_1.set({
        //     x1: (- width / 2) + this.strokeWidth / 2,
        //     x2: (- width / 2) + this.strokeWidth / 2,
        //     y1: (-height / 2) + this.elipseHeight,
        //     y2: (height / 2)
        // });

        // this.line_2.set({
        //     x1: width / 2 + this.strokeWidth / 2,
        //     x2: width / 2 + this.strokeWidth / 2,
        //     y1: (-height / 2) + this.elipseHeight,
        //     y2: (height / 2)
        // });

    }

    isMerged = () => {
        return this.connections.length > 0;
    }

    // merge = () => {
    //     for (const connection of Storage.connections) {
    //         for (const wire of connection.wires) {
    //             let x1 = wire.X1(), x2 = wire.X2(), y1 = wire.Y1(), y2 = wire.Y2();

    //             if (y1 > y2) {
    //                 [y1, y2] = [y2, y1];
    //             }

    //             if (x1 >= this.object.left && x1 <= this.object.left + this.object.width && y1 <= this.object.top && y2 >= this.object.top + this.object.height) {
    //                 this.connections.push(connection);
    //                 this.wires.push(wire);
    //                 wire.shields.push(this);
    //                 connection.shields.push(this);
    //             }
    //         }
    //     }
    // }

    merge = () => {
        for(const wire of this.wiresAndConnections){
            const { wire: w, connection } = wire;
            connection.shields = connection.shields.filter(shield => shield.id !== this.id);
        }

        // this.connectionPool = [];

        const { left, top, width, height } = this.shield;
        // const wiresAndConnections = ConnectionUtils.findWiresInRange(left, top, left + width, top + height, this);
        
        // this.wiresAndConnections = wiresAndConnections;
        // console.log(wiresAndConnections)

        // for(const wireAndConnection of wiresAndConnections){
        //     const { wire, connection } = wireAndConnection;

        //     connection.moveShield(wire);
        // }

        this.shield.set({ lockMovementX: true})
        Utils.renderAll();  
    }

    unMerge = () => {
        for(const connection of this.connections){
            connection.shields = connection.shields.filter(shield => shield.id !== this.id);

            for(const wire of connection.wires){
                wire.shields = wire.shields.filter(shield => shield.id !== this.id);
            }
        }

        this.connections = [];
        this.wires = [];
    }

    delete = () => {
        for(const wire of this.wiresAndConnections){
            const { wire: w, connection } = wire;
            connection.shields = connection.shields.filter(shield => shield.id !== this.id);
        }

        for(const connection of this.connectionPool){
            connection.delete({isTargetCompDel: true});
        }

        Utils.canvas.remove(this.object);
        Storage.shields = Storage.shields.filter(shield => shield.object.id !== this.object.id);
    }

    move = (wire) => {
        const nWires = [];
        for(const wire of this.wires){
            // arage wires in nWires with the x value

            if(wire.X1() >= this.object.left && wire.X1() <= this.object.left + this.object.width){
                if(!nWires.includes(wire)){
                    nWires.push(wire);
                }
            }
        }

        const nLeft = wire.X1() - this.object.width / 2;

        this.object.set({
            left: nLeft,
        });

        this.object.setCoords()
    }

    moveText = () => {
    }

}

export default Shield;