import Naming from "@/utils/Naming";


class CompMaster {

    constructor(component){
        this.component = component;
    }

    setObject = (object) => {
        this.object = object;
    }

    setCoords = (property = {}) => {
        if(property){
            this.object.set(property)
        }
        
        this.object.setCoords();
    }


    getExactCoords = () => {
        const matrix = this.object.calcTransformMatrix();
        const X = matrix[4], Y = matrix[5];

        return {
            x: X,
            y: Y
        }
    }

    calcTransformMatrix = () => {
        return this.object.calcTransformMatrix();
    }

    getWireDirection = (lX, lY) => {
        const { width, height } = this.object;
        const matrix = this.object.calcTransformMatrix();
        const x = matrix[4], y = matrix[5];

        let direction = (lY > height / 2 + y) ? Naming.Bottom : Naming.Top;
        return direction;
    }

    on = (eventName, callback) => {
        this.object.on(eventName, callback);
    }

    set = (obj) => {
        this.object.set(obj)
        for(const key in obj){
            this[key] = obj[key];
        }
    }

    getCustomCoords = () => {
        return {
            x: this.object.left,
            y: this.object.top
        }
    }


}

export default CompMaster;