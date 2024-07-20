
import Naming from "@/utils/Naming";
import Utils from "@/utils/Utils";
import Circle from "../widgets/Circle";

class Wire {

    static strokeWidth = 2;
    static selectedStrokeWidth = 5;
    static hSWidth = Wire.strokeWidth / 2
    static extraWidth = 0.3;


    constructor(points, wireColors = ['black', 'black'], connection, loadedData, endAnchor, log = false) {
        this.wireColors = (typeof wireColors) === 'string' ? JSON.parse(wireColors.replaceAll('\'', '\"')) : wireColors;
        this.intermidiators = [];
        this.recoverIntermidiators = []

        this.id = loadedData ? loadedData.id ? loadedData.id : Utils.getNanoId() : Utils.getNanoId();
        this.loadedData = loadedData
        this.single = this.wireColors.length == 0;
        this.connection = connection;
        this.endAnchor = endAnchor;
        this.log = log;
        this.type = Naming.Wire;
        this.isCurrentFlowing = false;
        this.changed = false;
        this.isTilt = loadedData ? loadedData.isTilt ? loadedData.isTilt : false : false;
        this.selected = false;

        if (!this.single) {
            this.line = this.createLine(points, wireColors[0]);
        }
        
        this.subLine = this.createLine(points, this.single ? this.wireColors[0] : this.wireColors[1], this.id);

        this.x1 = points[0];
        this.y1 = points[1];
        this.x2 = points[2];
        this.y2 = points[3];

        if (loadedData && loadedData.direction) {
            if (Naming.isVertical(loadedData.direction)) {
                this.set({ lockMovementY: true });
            } else {
                this.set({ lockMovementX: true });
            }
        }

        this.direction = loadedData ? loadedData.direction ? loadedData.direction : this.getDirection() : this.getDirection();
        this.orientation = this.direction;
        this.isHorizontal = Naming.isHorizontal(this.direction);

        if (!this.single) {
            this.subLine.set({ strokeDashArray: [20] });
            Utils.canvas.add(this.line);
        }


        Utils.canvas.add(this.subLine);

        this.loadPreData()
    }

    X1 = () => this.subLine.x1;

    Left = () => this.subLine.left;

    Top = () => this.subLine.top;

    X2 = () => this.subLine.x2;

    Y1 = () => this.subLine.y1;

    Y2 = () => this.subLine.y2;

    loadPreData = () => {
        if (this.loadedData && this.loadedData.intermidiators) {
            for (const intermidator of this.loadedData.intermidiators) {

                const circle = new Circle(intermidator, Utils.dispatch, this, intermidator.x, intermidator.y);
                this.intermidiators.push(circle)
            }
        }
    }

    createLine = (points, color, id) => {
        const line = new Utils.fabric.Line(points, {
            strokeWidth: Wire.strokeWidth,
            fill: color,
            stroke: color,
            selectable: true,
            hasControls: false,
            objectCaching: false,
            type: this.type,
            lockMovementX: true,
            lockMovementY: true,
            originX: 'center',
            originY: 'center'
        });


        line.set({ type: 'wire' })

        if (id) {
            line.set({ id: id })
        }
        return line;
    }

    getDirection = () => {
        let direction = null;

        if (this.X1() != this.X2()) {
            if (this.X2() > this.X1()) {
                direction = Naming.Right;
            } else {
                direction = Naming.Left;
            }
            this.set({ lockMovementX: true })
        } else {
            if (this.Y2() > this.Y1()) {
                direction = Naming.Bottom;
            } else {
                direction = Naming.Top;
            }
            this.set({ lockMovementY: true })
        }

        return direction;
    }

    set = (coords) => {
        if (coords != {}) {
            for (let key in coords) {
                this[key] = coords[key];
            }

            if (!this.single) {
                this.line.set(coords);
            }
            this.subLine.set(coords);
        }

        this.setCoords();
        this.setTopLeft();
    }

    setCoords = () => {
        if (!this.single) {
            this.line.setCoords();
        }

        this.subLine.setCoords();

        const { x1, x2, y1, y2 } = this.subLine;
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;

        const boundingRect = this.getBoundingRect();

        if (this.isHorizontal) {
            this.y2 = boundingRect.top;
        } else {
            this.x2 = boundingRect.left
        }

        this.setTopLeft()
    }

    getBoundingRect = () => this.subLine.getBoundingRect();

    
    setTopLeft = () => {
        this.top = this.subLine.getBoundingRect();
        this.left = this.subLine.getBoundingRect();
    }

    lock = () => {
        this.subLine.set({ lockMovementX: true, lockMovementY: true });
    }

    on = (event, callback) => {
        if (event == 'moving') {
            this.subLine.on(event, (e) => {
                callback(e);

                if (!this.single) {
                    this.copyCoords()
                }
            })
        } else {
            this.subLine.on(event, callback);
        }
    }

    hide = () => {
        if(this.selected){
            this.set({ strokeWidth: Wire.strokeWidth });

            if(this.intermidiators.length > 0){
                for(const intermidator of this.intermidiators){
                    const connections = intermidator.connectionPool;
    
                    for(const connection of connections){
                        connection.hide();
                    }
                }
            }
        }
    }

    show = () => {
        if(this.selected){
            this.set({ strokeWidth: Wire.selectedStrokeWidth });

            if(this.intermidiators.length > 0){
                for(const intermidator of this.intermidiators){
                    const connections = intermidator.connectionPool;
    
                    for(const connection of connections){
                        connection.show();
                    }
                }
            }
        }
    }

    select = () => {
        this.selected = true;
        this.set({ strokeWidth: Wire.selectedStrokeWidth })

        if(this.intermidiators.length > 0){
            for(const intermidator of this.intermidiators){
                const connections = intermidator.connectionPool;

                for(const connection of connections){
                    connection.select();
                }
            }
        }
    }

    unselect = () => {
        this.selected = false;
        this.set({ strokeWidth: Wire.strokeWidth });

        if(this.intermidiators.length > 0){
            for(const intermidator of this.intermidiators){
                const connections = intermidator.connectionPool;

                for(const connection of connections){
                    connection.unselect();
                }
            }
        }
    }
}

export default Wire;