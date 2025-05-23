import { nanoid } from "@reduxjs/toolkit";
import shortid from "shortid";
import { v4 as uuidv4 } from 'uuid';
import Config from "./Config";
import Manager from "@/widgets/diagram/widgets/Manager";
class Utils {

    static primaryColor = '#006AD3'
    static lightPrimaryColor = '#d7ebff'
    // static secondaryColor = '#152329'
    static secondaryColor = '#ffffff'
    static generateId = () => shortid.generate();
    static backgroundColor = '#f9f9fb'

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

    static requestRenderAll = () => { }


    static getVertAdder = (num, direction, rev = false) => rev ? Manager.Naming.isTop(direction) ? num : -num : Manager.Naming.isTop(direction) ? -num : num;
    static getHorAdder = (num, direction, rev = false) => rev ? Manager.Naming.isLeft(direction) ? num : -num : Manager.Naming.isLeft(direction) ? -num : num;


    static genOptionData = (data) => {
        const arr = [];

        for (const obj of data) {
            arr.push({ value: obj.id, label: obj.name, key: obj.id });
        }

        return arr;
    }

    static isNumeric = (value) => {
        return /^-?\d+$/.test(value);
    }

    static saveToLocalStorageJ = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static getFromLocalStorageJ = (key) => {
        return JSON.parse(localStorage.getItem(key));
    }

    static generateQueryString = (searchParams) => {
        let query = '';

        for (const key in searchParams) {
            query += key + '=' + searchParams[key] + '&';
        }
    
        return query.substring(0, query.length - 1);
    }

    static cAdd = (object) => {
        Utils.canvas.add(object)
    }

    static getSExactPoint = (x) => {
        x = parseInt(x);

        const gap = Config.backgroundLineGap * (2.5);
        const tX = x % gap;

        const nX = tX < gap / 2 ? x - tX : (x - tX) + gap;
        return nX;
    }

}

export default Utils;