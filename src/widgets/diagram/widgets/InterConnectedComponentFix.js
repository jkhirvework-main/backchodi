import Utils from "@/utils/Utils";
import Component from "./Component";
import Naming from "@/utils/Naming";

class InterConnectedComponentFix extends Component {
    constructor(data, dispatch, rX, rY) {

        data.id = Utils.getNanoId();
        data.uPins = data.upperPins ? data.upperPins : [{ id: Utils.getNanoId(), x: 25, realDirection: Naming.Top, pinNum: 1, isVisible: true }]
        data.lPins = data.lowerPins ? data.lowerPins : [{ id: Utils.getNanoId(), x: 25, realDirection: Naming.Bottom, pinNum: 2, isVisible: true }]
        data.upperPins = data.uPins;
        data.lowerPins = data.lPins;
        data.width = data.width ? data.width : 50;
        data.height = data.height ? data.height : 100;
        data.isEcm = false;
        data.isVar = false;
        data.varId = 0;
        data.icon = ''
        data.isFuse = false;
        data.subType = Naming.InterConnectedComponentFix;

        if (data.top) {
            data.top = data.top + 5;
        }

        

        super(data, dispatch, rX, rY);
        this.width = data.width ? data.width  : 50 - 1;
        this.height = data.height ? data.height : 100 - 1;
        this.rX = rX;
        this.rY = rY;
        this.isFuse = false
        this.isLocked = true;
        this.subType = Naming.InterConnectedComponentFix;
        this.refData = data.refData ? data.refData : {};

        console.log(this.container, 'container', this.rX, this.rY, this.width, this.height, this.container.left, this.container.top)

        if (this.container.left == 0 && this.container.top == 0) {
            this.container.set({ left: this.rX, top: this.rY, width: this.width, height: this.height })
            
           
            this.mRect.set({
                width: this.width, height: this.height, stroke: 'green',
                strokeWidth: 1,
                left: - this.width / 2,
                top: - this.height / 2,
            })
        }

    }
}

// module.exports = InterConnectedComponentFix;
export default InterConnectedComponentFix;