
import ApiHelper from "@/helpers/ApiHelper";
import Utils from "@/utils/Utils";


class Loader {
    static storedComponents = [];
    static storeImages = [];

    static loadComponentO = (id, isVar, varId) => {
        return new Promise(async (resolve, reject) => {
            if (!this.storedComponents.find(comp => (comp.isVar && comp.varId === varId) || (comp.id === id && !comp.isVar))) {
                const data = await ApiHelper.get('/find-comp?id=' + id + '&isVar=' + isVar+'&varId='+varId);
                console.log(data)
                for (const pin of data.upperPins) {
                    pin.nId = Utils.getNanoId()
                }

                for (const pin of data.lowerPins) {
                    pin.nId = Utils.getNanoId()
                }
                
                this.storedComponents.push(data);
                if (!this.storeImages.find(imgObj => imgObj.url === data.icon)) {
                    new Utils.fabric.Image.fromURL(ApiHelper.API_URL + data.icon.replace('uploads\\', '',), (image) => {
                        this.storeImages.push({
                            url: ApiHelper.API_URL + data.icon.replace('uploads\\', '',),
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
                
                const data = await ApiHelper.get('/find-comp2?id=' + id);

                for (const pin of data.upperPins) {
                    pin.nId = Utils.getNanoId()
                }

                for (const pin of data.lowerPins) {
                    pin.nId = Utils.getNanoId()
                }

                this.storedComponents.push(data);
                if (!this.storeImages.find(imgObj => imgObj.url === data.icon)) {
                    new Utils.fabric.Image.fromURL(ApiHelper.API_URL + data.icon.replace('uploads\\', '',), (image) => {
                       
                        this.storeImages.push({
                            url: ApiHelper.API_URL + data.icon.replace('uploads\\', '',),
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


}

export default Loader;