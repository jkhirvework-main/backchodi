

import Config from "@/utils/Config";
import Connection from "./connection/Connection";
import Naming from "@/utils/Naming";
import Storage from "@/utils/Storage";
import Utils from "@/utils/Utils";
import BaseWire from "./widgets/BaseWire";
import Component from "./widgets/Component";
import Group from "./widgets/Group";
import Loader from "./Loader";

class DataLoader {
    newIds = [];

    getNId = (id) => {
        if (!this.newIds.find(nId => nId.id === id)) {
            const obj = {
                id,
                nId: Utils.getUId()
            }
            this.newIds.push(obj);
            return obj.nId;
        } else {
            return this.newIds.find(nId => nId.id === id).nId
        }
    }

    constructor(data) {
        this.newIds = []
        this.data = data;
        this.loadBaseWires()
        this.loadComponents()
        this.loadGroup()

        setTimeout(() => {
            this.loadDiagramData()
            this.loadConnections();

            const center = Config.canvasWidth / 2 - Config.backgroundWidth / 2

            Utils.canvas.absolutePan(new Utils.fabric.Point(-center, 0))
            // WiringAnimation.startAnimate(true)
        }, 500)
    }


    loadBaseWires = () => {
        const { baseWires } = this.data;

        for (const bWire of baseWires) {
            for (const intermidator of bWire.intermidators) {
                intermidator.id = this.getNId(intermidator.id)
            }
            const baseWire = new BaseWire(bWire, bWire.intermidators);
        }
    }

    loadComponents = async () => {
        const components = this.data.components, comps = [];
        
        for (const component of components) {
            const data = await Loader.loadComponent(component.rCompId, component.isVar, component.varId);
            const nData = { ...data, ...component };
            nData.bId = this.getNId(nData.bId);

            nData.upperPinsArr.map(pin => {
                pin.nId = this.getNId(pin.nId);
            })

            nData.lowerPinsArr.map(pin => {
                pin.nId = this.getNId(pin.nId);
            })

            const comp = new Component(nData, Utils.dispatch, component.left, component.top);
            comps.push(comp)
        }

        return comps;
    }

    loadConnections = async () => {
        const connections = this.data.connections;

        for (const connection of connections) {
            const source = this.getCompByType(this.getNId(connection.sourceId), connection.sourceType);
            const target = this.getCompByType(this.getNId(connection.targetId), connection.targetType);


            if (source instanceof Component) {
                const { pin } = source instanceof Component ? Storage.findComponentPinById(this.getNId(connection.sourcePinId)) : Storage.findMultiConnectorPinById(this.getNId(connection.sourcePinId));
                connection.sourcePin = pin;
            }

            if (target instanceof Component) {
                console.log(target instanceof Component, connection.targetId, Storage.components)
                const { pin } = target instanceof Component ? Storage.findComponentPinById(this.getNId(connection.targetPinId)) : Storage.findMultiConnectorPinById(this.getNId(connection.targetPinId));
                connection.targetPin = pin;
            }

            for (const wire of connection.wires) {
                wire.id = this.getNId(wire.id)
                for (const intermidiator of wire.intermidiators) {
                    intermidiator.id = this.getNId(intermidiator.id)
                }
            }

            if (source && target) {
                const conn = new Connection(source, target, connection.wireObj, connection.startWireDirection, connection, false, true);
            }

        }
    }

    loadDiagramData = () => {
        const diagramData = this.data.data;
        if (diagramData.components) {
            for (const component of diagramData.components) {
                console.log(Storage.components)
                const compInstance = Storage.findComponentById(this.getNId(component.id));
                console.log(compInstance)
                
                const upperPinsState = compInstance.upperPinsState, lowerPinsState = compInstance.lowerPinsState;
               
                const { left } = compInstance.container;

                component.upperPinsState.map((state, index) => {
                    upperPinsState[index].left = state
                    compInstance.upperPinsArr[index].set({ left: left + state });
                })

                component.lowerPinsState.map((state, index) => {
                    lowerPinsState[index].left = state
                    compInstance.lowerPinsArr[index].set({ left: left + state });
                })

                if (component.width) {
                    compInstance.scaleContainer(component.width, compInstance.height)
                    Utils.renderAll();
                }

                for (const check of component.componentChecks) {
                    if (check.pinData) {
                        check.pinData.sourcePinId = this.getNId(check.pinData.sourcePinId);
                        check.pinData.targetPinId = this.getNId(check.pinData.targetPinId)
                    }
                }

                compInstance.componentChecks = component.componentChecks;
            }
        }
    }

    loadGroup = () => {
        const groups = this.data.groups;

        for (const gObj of groups) {
            const group = new Group(gObj);
        }
    }


    getCompByType = (id, type) => {
        let comp = null;

        switch (type) {
            case Naming.Component:
                comp = Storage.findComponentById(id);
                break;
            case Naming.Circle:
                comp = Storage.findCircleById(id);
                break;
            case Naming.MultiConnector:
                comp = Storage.findMultiConnectorById(id);
                break;
            case Naming.TriangleComponent:
                comp = Storage.findEndComponentById(id);
                break;
            case Naming.Text:
                comp = Storage.findTextById(id);
                break;
            case Naming.Connector:
                comp = Storage.findConnectorById(id);
                break;
        }

        return comp;
    }


}

export default DataLoader;