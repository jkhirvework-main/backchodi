
import Storage from "@/utils/Storage";
import Utils from "@/utils/Utils";

class WiringAnimation {

    static isAnimateWire = false;
    static startValue = 40
    static endValue = 0;

    static startAnimate = (v) => {
        this.isAnimateWire = v;
        for (const connection of Storage.connections) {
            if (connection.wireColors[0] == connection.wireColors[1]) {
                for (const nWire of connection.wires) {
                    nWire.changes = true;

                    nWire.subLine.set({ strokeDashArray: [37, 3] })
                    nWire.line.set({ fill: 'white', stroke: 'white' });
                }
            }
        }

        
        this.animateCurrentFlow(this.startValue);
    }

    static stopAnimate = (v) => {
        this.isAnimateWire = v;

        for (const connection of Storage.connections) {
            if (connection.wireColors[0] == connection.wireColors[1]) {
                for (const nWire of connection.wires) {
                    nWire.changes = true;

                    nWire.subLine.set({ strokeDashArray: [20, 20] })
                    nWire.line.set({ fill: connection.wireColors[0], stroke: connection.wireColors[0] });
                }
            }
        }
    }

    static animateCurrentFlow = () => {
        const wires = [];


        Utils.fabric.util.animate({
            startValue: this.startValue, endValue: this.endValue, duration: 1000,
            onChange: (value) => {
                if (this.isAnimateWire) {
                    
                    for (const connection of Storage.connections) {
                        let nValue = !connection.reverse ? value : this.startValue - value ;
                    
                        for (const nWire of connection.wires) {
                            nWire.subLine.set({ strokeDashOffset: nValue });
                            nWire.isCurrentFlowing = true;
                        }
                    }

                    window.requestAnimationFrame(() => {
                        Utils.renderAll();
                    })
                }

            }, onComplete: () => {
                if (this.isAnimateWire) {
                    this.animateCurrentFlow(this.startValue);
                }

            }
        });
    }

}


export default WiringAnimation;