import Naming from "./Naming";

class Storage {

    static baseWires = [];
    static components = [];
    static circles = []
    static connections = [];

    static findComponentById = (id) => this.components.find(component => component.id === id)
    static findCircleById = id => this.circles.find(circle => circle.id === id)
    static findMultiConnectorById = id => this.multiWireConnectors.find(multiConnector => multiConnector.id === id);
    static findTextById = id => this.textWidegts.find(text => text.id === id);
    static findConnectorById = id => this.connectors.find(connector => connector.id === id);
    static findEndComponentById = id => this.endComponents.find(endComponent => endComponent.id === id);
    static findGroupById = id => this.groupRects.find(groupRect => groupRect.id === id)


    static findWireById = (id) => {
        for(const connection of this.connections){
            for(const wire of connection.wires){
                if(wire.id === id){
                    return {wire, connection};
                }
            }
        }
    }

    
    static findComponentPinById = id => {
        for (const component of this.components) {
            for (const pin of component.upperPinsArr) {

                if (pin.id === id) {
                    return { pin, component };
                }
            }

            for (const pin of component.lowerPinsArr) {
                if (pin.id === id) {
                    return { pin, component };
                }
            }
        }
    }


    static findMultiConnectorPinById = id => {
        for (const component of this.multiWireConnectors) {
            for (const pin of component.upperPinsArr) {
                if (pin.id === id) {
                    return { pin, component };
                }
            }

            for (const pin of component.lowerPinsArr) {
                if (pin.id === id) {
                    return { pin, component };
                }
            }
        }
    }

}

export default Storage;