
import { findComponent, findComponent2 } from "@/app/user/actions/oemActions";
import BackendHelper from "@/helpers/BackendHelper";
import Naming from "@/utils/Naming";
import Utils from "@/utils/Utils";


class Loader {
    static storedComponents = [];
    static storeImages = [];

    static loadComponentO = (id, isVar, varId) => {
        return new Promise(async (resolve, reject) => {
            if (!this.storedComponents.find(comp => (comp.isVar && comp.varId === varId) || (comp.id === id && !comp.isVar))) {
                const data = await findComponent(id, isVar, varId);
                for (const pin of data.upperPins) {
                    pin.nId = Utils.getNanoId()
                }

                for (const pin of data.lowerPins) {
                    pin.nId = Utils.getNanoId()
                }
                
                this.storedComponents.push(data);
                if (!this.storeImages.find(imgObj => imgObj.url === data.icon)) {
                    new Utils.fabric.Image.fromURL(BackendHelper.API_URL + data.icon.replace('uploads\\', '',), (image) => {
                        this.storeImages.push({
                            url: BackendHelper.API_URL + data.icon.replace('uploads\\', '',),
                            image: image.getElement()
                        })

                        resolve(data)
                    })
                } else {
                    resolve(data)
                }

            } else {
                const comp = this.storedComponents.find(comp => (comp.isVar && comp.varId === varId) || (comp.id === id && !comp.isVar));
                if (comp) {
                    for (const pin of comp.upperPins) {
                        pin.nId = Utils.getNanoId()
                    }

                    for (const pin of comp.lowerPins) {
                        pin.nId = Utils.getNanoId()
                    }
                }
                resolve(comp)
            }
        })
    }

    static loadComponent = async (id, isVar, varId) => {

        return new Promise(async (resolve, reject) => {
            if (!this.storedComponents.find(comp => (comp.isVar && comp.varId === varId) || (comp.id === id && !comp.isVar))){
                
                
                const data = await findComponent2(id);

                if(data['status'] === false){
                    resolve(data)
                    return;
                }

                for (const pin of data.upperPins) {
                    pin.nId = Utils.getNanoId()
                }

                for (const pin of data.lowerPins) {
                    pin.nId = Utils.getNanoId()
                }

                this.storedComponents.push(data);
                if (!this.storeImages.find(imgObj => imgObj.url === data.icon)) {
                    new Utils.fabric.Image.fromURL(BackendHelper.API_URL + data.icon.replace('uploads\\', '',), (image) => {
                       
                        this.storeImages.push({
                            url: BackendHelper.API_URL + data.icon.replace('uploads\\', '',),
                            image: image.getElement()
                        })
                
                        resolve(data)
                    })
                } else {
                    resolve(data)
                }

            }else {
                const comp = this.storedComponents.find(comp => (comp.isVar && comp.varId === varId) || (comp.id === id && !comp.isVar));
                if (comp) {
                    for (const pin of comp.upperPins) {
                        pin.nId = Utils.getNanoId()
                    }

                    for (const pin of comp.lowerPins) {
                        pin.nId = Utils.getNanoId()
                    }
                }
                resolve(comp)
            }
        });
    }

    static loadAllComponents = async components => {
        const nComps = [];

        for (const component of components) {
            if (!component.isFuse) {
                const { rCompId, varId, isVar } = component;
                if (!nComps.find(comp => comp.rCompId === rCompId && comp.varId === varId && comp.isVar === isVar)) {
                    nComps.push({ rCompId, varId, isVar });
                }
            }
        }

        const comps = await BackendHelper.post('/find-diagrams-comps', { comps: nComps });
        return comps
    }

    static formatComponent = (component, comps) => {
        let data = comps.find(comp => comp.id === component.rCompId);

        for(const comp of comps){
            if(!comp.isVar && comp.id === component.rCompId){
                data = comp;
                break;
            }
            if(comp.isVar){
                if(comp.varId === component.varId){
                    data = comp;
                    break;
                }
            }
        }

        if (component.isFuse) {
            data = {}
            data.name = Naming.Fuse;
            data.id = Utils.getNanoId();
            data.uPins = [{ id: Utils.getNanoId(), x: 25, realDirection: Naming.Top, pinNum: 1, isVisible: true }]
            data.lPins = [{ id: Utils.getNanoId(), x: 25, realDirection: Naming.Bottom, pinNum: 2, isVisible: true }]
            data.upperPins = data.uPins;
            data.lowerPins = data.lPins;
            data.width = 50;
            data.height = 100;
            data.iconWidth = 24;
            data.iconHeight = 24;
            data.iconScale = 1;
            data.initCode = 'F2';
            data.isEcm = false;
            data.isVar = false;
            data.varId = 0;
            data.isFuse = true;
            data.icon = ''
        }else if(component.subType === Naming.InterConnectedComponentFix){
            data = component
            data.name = component.name;
            data.id = component.id;
            data.isVar = false;
            data.bId = component.bId;
            data.uPins = component.upperPinsArr;
            data.lPins = component.lowerPinsArr;
            data.upperPins = data.uPins;
            data.lowerPins = data.lPins;

            data.varId = 0;
        }


        if (data) {
            data = { ...data }

            for (const pin of data.upperPins) {
                pin.nId = Utils.getNanoId()
            }


            for (const pin of data.lowerPins) {
                pin.nId = Utils.getNanoId()
            }
        }

        return data;
    }

}

export default Loader;