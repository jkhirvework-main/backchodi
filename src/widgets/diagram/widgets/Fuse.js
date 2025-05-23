import Storage from "@/utils/Storage";

const { default: Naming } = require("@/utils/Naming");
const { default: Component } = require("./Component");
const { default: Utils } = require("@/utils/Utils");

class Fuse extends Component {

    static colors = [{
        value: 1,
        color: 'black',
    }, {
        value: 2,
        color: 'grey',
    }, {
        value: 3,
        color: 'violet'
    }, {
        value: 4,
        color: 'pink'
    }, {
        value: 5,
        color: 'biege'
    }, {
        value: 7.5,
        color: 'brown'
    }, {
        value: 10,
        color: 'red'
    }, {
        value: 15,
        color: 'blue'
    }, {
        value: 20,
        color: 'yellow'
    }, {
        value: 25,
        color: 'grey'
    }, {
        value: 30,
        color: 'green'
    }, {
        value: 40,
        color: 'amber'
    }, {
        value: 50,
        color: 'red'
    }, {
        value: 60,
        color: 'blue'
    }, {
        value: 70,
        color: 'tan'
    }, {
        value:80,
        color: 'black'
    }, {
        value: 100,
        color: 'blue'
    }, {
        value: 125,
        color: 'green'
    }, {
        value: 150,
        color: 'black'
    }]

    constructor(data, dispatch, rX, rY) {
        data.name = Naming.Fuse;
        data.id =  Utils.getNanoId();
        data.uPins = [{ id: Utils.getNanoId(), x: 25, realDirection: Naming.Top, pinNum: 1, isVisible: true }]
        data.lPins = [{ id: Utils.getNanoId(), x: 25, realDirection: Naming.Bottom, pinNum: 2, isVisible: true }]
        data.upperPins = data.uPins;
        data.lowerPins = data.lPins;
        data.width = 50;
        data.height = 100;
        data.iconWidth = 24;
        data.iconHeight = 24;
        data.iconScale = 1;
        data.initCode = 'F2';
        data.isEcm = false;
        data.isVar = false;
        data.varId = 0;
        data.isFuse = true;

        if(data.top){
            data.top = data.top + 5;
        }


        super(data, dispatch, rX, rY);

        this.data = data;
        this.dispatch = dispatch;
        this.code = data.code ? data.code : 'Code';
        this.width = 50 - 1;
        this.height = 100 - 1; 
        this.amp = data.amp ? data.amp : 1;
        this.rX = rX;
        this.rY = rY;
        this.isFuse = true;

        this.setUp();
    }

    setUp = () => {
        this.setUpFuse();
    }

    setUpFuse = () => {
        // rx: 4, ry: 4
        this.mRect.set({fill: Fuse.colors.find(c => c.value == this.amp).color, });

        const fuseAmpText = new Utils.fabric.IText(this.amp + '', {
            left: this.rX + this.width / 2,
            top: this.rY + this.height / 2,
            fontSize: 20,
            originX: 'center',
            originY: 'center',
            fill: 'white'
        })

        this.container.addWithUpdate(fuseAmpText);
        Storage.components.push(this);
        this.fuseAmpText = fuseAmpText;

        Utils.renderAll();
    }

    setAmp = (amp) => {
        this.amp = amp;
        this.fuseAmpText.set({text: amp + ''});
        this.mRect.set({fill: Fuse.colors.find(c => c.value == this.amp).color});
        Utils.renderAll()
    }

    

}

export default Fuse;