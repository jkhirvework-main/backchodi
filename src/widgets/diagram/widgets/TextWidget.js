import Utils from "@/utils/Utils";
import CompMaster from "./CompMaster";
import Naming from "@/utils/Naming";
import Storage from "@/utils/Storage";

class TextWidegt extends CompMaster {

    constructor(data, dispatch, rX, rY) {
        super();
        this.data = data;
        this.dispatch = dispatch;
        this.id = data.id ? data.id : Utils.getNanoId();
        this.rX = rX;
        this.rY = rY;

        this.value = data.value ? data.value : data.canEmpty ? '' : 'Temp';
        this.sourcComponent = null;
        this.lGap = data.lGap ? data.lGap : 0;
        this.tGap = data.tGap ? data.tGap : 0;
        this.type = Naming.Text
        this.isDef = false
        this.fontSize = data.fontSize ? data.fontSize : 14;
        this.angle = data.angle != undefined ? data.angle : 0;
        this.visible = data.visible != undefined ? data.visible : true;
        this.dontSave = data.dontSave ? data.dontSave : false;


        if (data.sourceComponentId) {
            this.sourcComponent = Storage.findComponentById(data.sourceComponentId);
            if (!this.sourcComponent) {
                this.sourcComponent = Storage.findMultiConnectorById(data.sourceComponentId);
            }
            if (!this.sourcComponent) {
                this.sourcComponent = Storage.findConnectorById(data.sourceComponentId);
            }
            Storage.addTextWidgetToComponent(this.sourcComponent, this);
        }

        this.createText();
        this.setUpCallbacks();

        Storage.textWidegts.push(this);
    }

    isAvailInComponent = () => {
        return this.sourcComponent;
    }

    show = () => {
        this.object.set({ visible: true });
        Utils.renderAll();
    }

    hide = () => {
        this.object.set({ visible: false });
        Utils.renderAll();
    }

    createText = () => {
        const text = new Utils.fabric.IText(this.value, {
            left: this.rX,
            top: this.rY,
            hasControls: false,
            fontSize: this.fontSize,
            type: Naming.Text,
            id: this.id,
            backgroundColor: 'white',
            originX: 'center',
            originY: 'center',
            type: this.type,
            angle: this.angle,
            visible: this.visible,
        })

        this.setObject(text);
        this.text = text;
        Utils.cAdd(text)
    }

    getText = () => this.object.text;
    setText = (text) => this.object.set({ text })

    setFontSize = (size) => {
        this.object.set({ fontSize: size })
        Utils.renderAll();
    };

    getFontSize = () => this.object.fontSize;

    setSourceComponent = (component) => {
        const { left, top } = component.object;
        const { left: tLeft, top: tTop } = this.object;
        this.lGap = tLeft - left;
        this.tGap = tTop - top;

        Storage.addTextWidgetToComponent(component, this);

        this.sourcComponent = component;
    }

    moveTo = (left, top) => {
        this.object.set({ left, top });
        this.object.setCoords();
    }

    setUpCallbacks = () => {
        this.object.on('mousedown', (e) => {
            Utils.canvas.bringToFront(e.target)

            if (e.e.altKey) {
                this.set({ lockMovementX: false, lockMovementY: false })
            }
        })

        this.object.on('moving', (e) => {
            if (this.sourcComponent) {
                const { left, top } = this.sourcComponent.object;
                const { left: tLeft, top: tTop } = this.object;
                this.lGap = tLeft - left;
                this.tGap = tTop - top;
            }
        })

        this.object.on('mouseup', (e) => {
            this.set({ lockMovementX: true, lockMovementY: true })
        })
    }

    delete = () => {
        if (this.sourcComponent && !this.isDef && this.sourcComponent.textWidegts) {
            this.sourcComponent.textWidgets = this.sourcComponent.textWidgets.filter(textWidget => textWidget.id !== this.id);
        }
        Storage.textWidegts = Storage.textWidegts.filter(textWidget => textWidget.id !== this.id);
        Utils.remove(this.object);

        return {
            type: Ability.DeleteWidget,
            targetComp: this
        }
    }

    delOpts = () => {
        return {
            type: Ability.DeleteWidget,
            targetComp: this
        }
    }

    recover = () => {
        Utils.canvas.add(this.object);

        if (!Storage.textWidegts.includes(this)) {
            Storage.textWidegts.push(this);
        }

        if (this.sourcComponent) {
            if (!this.sourcComponent.textWidgets.includes(this)) {
                this.sourcComponent.textWidgets.push(this);
            }
        }
    }

    copy = () => {
        const copyObj = {
            value: this.value,
            type: this.type,
            sourceComponent: this.sourcComponent
        }

        return copyObj;
    }

    rotate = (angle) => {
        this.set({ angle });

        Utils.renderAll()
    }


    static parseTextProperties = (textProperties) => {
        const { id } = textProperties;
        const textWidget = Storage.findTextById(id);
        return {
            fontSize: textProperties.fontSize ? textProperties.fontSize : 14,
            angle: textProperties.angle ? textProperties.angle : 0,
            visible: textProperties.visible ? textProperties.visible : true,
            lGap: textWidget.lGap ? textWidget.lGap : 0,
            tGap: textWidget.tGap ? textWidget.tGap : 0,
        }
    }

}

export default TextWidegt;