

import Config from "@/utils/Config";
import Connection from "./connection/Connection";
import Naming from "@/utils/Naming";
import Storage from "@/utils/Storage";
import Utils from "@/utils/Utils";
import BaseWire from "./widgets/BaseWire";
import Component from "./widgets/Component";
import Group from "./widgets/Group";
import Loader from "./Loader";
import Connector from "./widgets/Connector";
import NCircle from "./widgets/NCircle";
import TriangleComponent from "./widgets/TriangleComponent";
import Manager from "./widgets/Manager";
import TextWidegt from "./widgets/TextWidget";
import Fuse from "./widgets/Fuse";
import ArrowGroup from "./widgets/ArrowGroup";

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

        return (async () => {
            this.loadBaseWires()
            await this.loadComponents()
            this.loadGroup()

            this.loadDiagramData()
            const nConnectors = await this.loadConnectors(this.data.connectors)
            this.loadNCircles(this.data.nCircles)
            const endComps = this.loadEndComponents(this.data.data.endComponents);
            this.loadShields(this.data.data);
            this.loadConnections();
            this.loadTextWidgets(this.data.textWidgets);
            const arrowGroups = this.loadArrowGroups(this.data.data.arrowGroups)


            const center = Config.canvasWidth / 2 - Config.backgroundWidth / 2

            Utils.canvas.absolutePan(new Utils.fabric.Point(-center, 0));


            Utils.diagramViewer.setZoomValue(Config.isMobile ? 0.2 : 0.5);
            return this;
        })();

    }


    loadNCircles = (nCircles) => {
        const nCirclesArr = [];

        if (typeof nCircles === 'string') {
            nCircles = JSON.parse(nCircles);
        }

        for (const nCircle of nCircles) {

            nCircle.id = this.getNId(nCircle.id);

            const nC = new NCircle(nCircle, Utils.dispatch, nCircle, nCircle.left, nCircle.top);

            nCirclesArr.push(nC);
        }



        return nCirclesArr;
    }


    loadTextWidgets = (textWidgets) => {
        const txtWidgets = []
        for (const textWidget of textWidgets) {


            textWidget.id = this.getNId(textWidget.id);

            if (textWidget.sourceComponentId) {
                textWidget.sourceComponentId = this.getNId(textWidget.sourceComponentId)
            }

            const txtWidget = new TextWidegt(textWidget, Utils.dispatch, textWidget.left, textWidget.top)
            txtWidgets.push(txtWidget);
        }

        for (const component of Storage.components) {
            for (const connection of component.connectionPool) {
                const { sourcePin, targetPin } = connection;


                if (sourcePin) {
                    const { component, pin } = Storage.findComponentPinById(sourcePin.id);
                    component.createConnectionTypeText(connection, pin);
                }

                if (targetPin) {
                    const { component, pin } = Storage.findComponentPinById(targetPin.id);
                    component.createConnectionTypeText(connection, pin);
                }
            }
        }

        return txtWidgets;
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
        const nCompsData = await Loader.loadAllComponents(components);


        for (const component of components) {

            // const data = await Loader.loadComponent(component.rCompId, component.isVar, component.varId);

            const data = await Loader.formatComponent(component, nCompsData);

            console.log(data, component, nCompsData, 'data')
            if (!data.width) {
                data.width = 100;
                data.height = 100;
            }

            if (data['status'] !== false) {
                const nData = { ...data, ...component };

                nData.upperPins = component.upperPinsArr;
                nData.lowerPins = component.lowerPinsArr;


                nData.bId = this.getNId(nData.bId);

                // nData.width = component.width;

                nData.upperPinsArr.map(pin => {
                    pin.nId = this.getNId(pin.nId);
                    // pin.id = this.getNId(pin.id);
                })

                nData.lowerPinsArr.map(pin => {
                    pin.nId = this.getNId(pin.nId);
                    // pin.id = this.getNId(pin.id);
                })


                for (const oTextWidget of component.oTextWidgets) {
                    if (oTextWidget.pinId) {
                        oTextWidget.pinId = this.getNId(oTextWidget.pinId)
                    }
                }

                if (data) {
                    if (data.isFuse) {
                        const comp = new Fuse(nData, Utils.dispatch, component.left, component.top);
                        comps.push(comp)
                    } else {
                        const comp = new Component(nData, Utils.dispatch, component.left, component.top);
                        comps.push(comp)
                    }

                }

            }

        }

        return comps;
    }

    loadConnections = async () => {
        const connections = this.data.connections;

        for (const connection of connections) {



            const source = this.getCompByType(this.getNId(connection.sourceId), connection.sourceType);
            const target = this.getCompByType(this.getNId(connection.targetId), connection.targetType);


            // console.log(connection.sourceType, connection.targetType, source, target)

            if (source instanceof Component) {
                const { pin } = source instanceof Component ? Storage.findComponentPinById(this.getNId(connection.sourcePinId)) : Storage.findMultiConnectorPinById(this.getNId(connection.sourcePinId));
                connection.sourcePin = pin;
            }

            if (target instanceof Component) {
                const { pin } = target instanceof Component ? Storage.findComponentPinById(this.getNId(connection.targetPinId)) : Storage.findMultiConnectorPinById(this.getNId(connection.targetPinId));
                connection.targetPin = pin;
            }

            // for (const wire of connection.wires) {
            //     wire.id = this.getNId(wire.id)
            //     for (const intermidiator of wire.intermidiators) {
            //         intermidiator.id = this.getNId(intermidiator.id)
            //     }
            // }



            if (source && target) {
                const conn = new Connection(source, target, connection.wireObj, connection.startWireDirection, connection, false, true);
            }

        }
    }

    loadDiagramData = () => {
        const diagramData = this.data.data;
        if (diagramData.components) {
            for (const component of diagramData.components) {
                const compInstance = Storage.findComponentById(this.getNId(component.id));

                compInstance.upperPinsState = component.upperPinsState.map(num => {
                    return { left: num, top: 0 }
                });
                compInstance.lowerPinsState = component.lowerPinsState.map(num => {
                    return { left: num, top: compInstance.container.height }
                });

                let upperPinsState = compInstance.upperPinsState, lowerPinsState = compInstance.lowerPinsState;


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

    loadEndComponents = async (endComponents) => {
        const endComps = [];

        if (endComponents) {
            for (const endComponent of endComponents) {
                let endComp = null;
                endComponent.id = this.getNId(endComponent.id)

                switch (endComponent.type) {
                    case Naming.TriangleComponent:
                        endComp = new TriangleComponent(endComponent, endComponent.left, endComponent.top);
                        break;
                }

                endComps.push(endComp);
            }
        }
        return endComps;
    }

    loadShields = (diagramData) => {
        if (diagramData.shields) {
            for (const shield of diagramData.shields) {

                shield.id = this.getNId(shield.id);

                if (shield.subType === Naming.NormalShield) {
                    const nShield = new Manager.Shield(shield, shield.left, shield.top);
                } else {
                    // const cylinderShield = new CylinderShield(shield, shield.left, shield.top);
                }

            }
        }
    }


    loadConnectors = async (connectors) => {
        const nConnectors = [];
        if (connectors && Array.isArray(connectors)) {
            for (const connector of connectors) {
                connector.id = this.getNId(connector.id);
                connector.parId = this.getNId(connector.parId);
                connector.wireId = this.getNId(connector.wireId);

                const nConnector = new Connector(connector, Utils.dispatch, connector, connector.left, connector.top);
                nConnectors.push(nConnector);
            }
        }

        return nConnectors;
    }

    loadArrowGroups = async (arrowGroups) => {
        const arrowGroupsS = [];

        if (!arrowGroups) {
            arrowGroups = []
        }

        for (const arrowGroup of arrowGroups) {
            const arrowGroupS = new ArrowGroup(arrowGroup, Utils.dispatch, arrowGroup.left, arrowGroup.top);
            arrowGroupsS.push(arrowGroupS);
        }

        return arrowGroupsS;
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
            case Naming.NCircle:
                comp = Storage.findNCircleById(id);
                break;
            case Naming.Shield:
                comp = Storage.findShieldById(id);
                comp = Storage.shields.find(shield => shield.id === id);
                break;
        }

        return comp;
    }


}

export default DataLoader;