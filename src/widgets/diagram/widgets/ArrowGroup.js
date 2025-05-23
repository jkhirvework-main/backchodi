import Utils from "@/utils/Utils";
import CompMaster from "./CompMaster";
import Storage from "@/utils/Storage";
import Naming from "@/utils/Naming";
import Manager from "@/widgets/diagram/widgets/Manager";

class ArrowGroup extends CompMaster {
    constructor(data, dispatch, rX, rY) {
        super(data, dispatch, rX, rY);
        this.rX = rX;
        this.rY = rY;
        this.strokeWidth = 2;
        this. triangleRadius = 12;
        this.text = data.text ? data.text : 'Arrow';
        this.direction = data.direction ? data.direction : Naming.Top;
        this.id = data.id ?  data.id : Utils.getNanoId();
        this.width = data.width ? data.width : 100;
        this.type = Naming.ArrowGroup;

        
        this.setUp();

        Storage.arrowGroups.push(this);
    }

    setUp() {
        this.createArrow();
        this.setUpCallBacks();
    }

    createArrow() {
        const lTriangle = new Utils.fabric.Triangle({
            width: this.triangleRadius,
            height: this.triangleRadius,
            fill: 'black',
            angle: 270,
            hasControls: false,

        });

        const line = new Utils.fabric.Line([this.triangleRadius,-(this.triangleRadius/2+1),this.width,-(this.triangleRadius/2+1)], {
            fill: 'black',
            stroke: 'black',
            strokeWidth: this.strokeWidth,
            strokeDashArray: [10, 5],
        });

        const rTriangle = new Utils.fabric.Triangle({
            width: this.triangleRadius,
            height: this.triangleRadius,
            fill: 'black',
            angle: 90,
            hasControls: false,
            top: -(this.triangleRadius+1),
            left: this.width+this.triangleRadius,
        });

        const group = new Utils.fabric.Group([lTriangle, line, rTriangle]);

        group.set({
            left: this.rX,
            top: this.rY,
            hasControls: false,
            type: Naming.ArrowGroup,
            id: this.id,
            lockMovementX: true,
            lockMovementY: true,
            selectable: false,
            
        });

        this.group = group;
        this.lTriangle = lTriangle;
        this.rTriangle = rTriangle;
        this.line = line;
        this.object = group;


        // group.setControlsVisibility({ tl: false, tr: false, bl: false, br: false, mtr: false, mt: false, mb: false,});

        this.createTextWidget();

        Utils.canvas.add(group);
    }
    
    setUpCallBacks() {
        this.object.on('mousedown', (e) => {
            // Utils.dispatchConnnectionFocus(Utils.dispatch, this.id, Naming.Shield)
        })

        this.object.on('scaling', (e) => {
            this.scaleArrow(this.object.width * this.object.scaleX, this.object.height * this.object.scaleY)

            this.textWidget.set({ left: this.object.left + this.object.width / 2, top: this.object.top + Utils.getVertAdder(20, this.direction) });
        })

        this.object.on('moving', (e) => {
            this.textWidget.set({ left: this.object.left + this.object.width / 2, top: this.object.top + Utils.getVertAdder(20, this.direction) });
        })
    }


    setDirection(direction) {
        this.direction = direction;
        this.textWidget.set({ left: this.object.left + this.object.width / 2, top: this.object.top + Utils.getVertAdder(20, this.direction) });
        Utils.canvas.renderAll();
    }


    delete = () => {
        Storage.arrowGroups = Storage.arrowGroups.filter(arrowGroup => arrowGroup.id !== this.id);
        Utils.remove(this.object);
        this.textWidget.delete();
        Utils.remove(this.object);
    }

    createTextWidget = (data) => {
        const textWidget = new Manager.TextWidget({ value: this.text }, Utils.dispatch, this.object.left + this.object.width / 2, this.object.top + Utils.getVertAdder(20, this.direction));
        this.textWidget = textWidget;
        textWidget.isArrowText = true;

    }

    scaleArrow(width, height) {
        this.object.set({
            width,
            height,
            scaleX: 1,
            scaleY: 1,

        })

        this.line.set({
            x1: (- width/2) + this.triangleRadius,
            x2: (width/2) - this.triangleRadius,
            y1: -1,
            y2: -1,
        })

        this.lTriangle.set({
            left: (- width/2) ,
            top: height/2,
        })

        this.rTriangle.set({
            left: (width/2) ,
            top: -height/2,
        })

    }


}

export default ArrowGroup;