import { nanoid } from "@reduxjs/toolkit";
import shortid from "shortid";
import { v4 as uuidv4 } from 'uuid';

class Utils {

    static primaryColor = '#006AD3'
    static secondaryColor = '#152329'
    static generateId = () => shortid.generate();

    static fabric = null;
    static canvas = null;
    static diagramViewer = null;
    static backgroundWidth = 0;
    static backgroundHeight = 0;
    static data = 0;
    static dispatch = null;
    static tmpCompSelected = null;

    static addToCanvas = (object) => Utils.canvas.add(object);

    static getNanoId = () => nanoid();

    static getUId = (len) => {
        let uId = uuidv4();
        return len ? uId.substring(0, len) : uId;
    }

    static renderAll = () => this.canvas.renderAll();
    
    static requestRenderAll = () => {}

    
    static getVertAdder = (num, direction, rev = false) => rev ? Naming.isTop(direction) ? num : -num : Naming.isTop(direction) ? -num : num;
    static getHorAdder = (num, direction, rev = false) => rev ? Naming.isLeft(direction) ? num : -num : Naming.isLeft(direction) ? -num : num;

}

export default Utils;