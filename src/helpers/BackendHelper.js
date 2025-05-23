import axios from "axios";


class BackendHelper {
    static API_URL = 'http://192.168.1.12:4001/'

    static axiosApi = axios.create({
        baseURL: this.API_URL,
        withCredentials: true
    })

    
    static get = async (url, config = { withCredentials: true }) => {
        return await this.axiosApi.get(url, {
            withCredentials: true,
        }).then(response => {
            return response.data
        })
    }

    
    static post = async (url, data, config = {}) => {
        const nData = data instanceof FormData ? data : { ...data }
        return await this.axiosApi
            .post(url, nData, {
                withCredentials: true,
            })
            .then(response => response.data)
    }

}

export default BackendHelper;