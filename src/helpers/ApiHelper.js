import axios from 'axios';

class ApiHelper {

    // static API_URL = 'http://localhost:4000/'
    static API_URL = 'https://editorbackend.autoclinic.site/'
    
    static axiosApi = axios.create({
        baseURL: this.API_URL,
    })

    static get = async (url, config = {}) => {
        return await this.axiosApi.get(url, { ...config }).then(response => {
            return response.data
        })
    }

    static post = async (url, data, config = {}) => {
        const nData = data instanceof FormData ? data : { ...data }
        return await this.axiosApi
            .post(url, nData, { ...config })
            .then(response => response.data)
    }

    static put = async (url, data, config = {}) => {
        return await this.axiosApi
            .put(url, { ...data }, { ...config })
            .then(response => response.data)
    }

    static del = async (url, config = {}) => {
        return await this.axiosApi
            .delete(url, { ...config })
            .then(response => response.data)
    }

}



export default ApiHelper;