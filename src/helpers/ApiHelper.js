import axios from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const getHeaders = () => {
    const headers = {};
    const cookies1 = cookies();

    if (cookies1.get('token')) {
        headers['Authorization'] = `Bearer ${cookies1.get('token').value}`;
    }

    return headers
}

class ApiHelper {
    static API_URL = 'http://192.168.1.12:4000/'
    // static API_URL = 'http://localhost:4000/'
    // static API_URL = 'https://editorbackend.autoclinic.site/'

    static axiosApi = axios.create({
        baseURL: this.API_URL,
        withCredentials: true
    })

    static get = async (url, config = { withCredentials: true }) => {
        let ans = await this.axiosApi.get(url, {
            withCredentials: true,
            headers: getHeaders()
        }).then(response => {
            return response.data
        }).catch((err, response) => {
            if(err.response){
                if(err.response.status === 401){
                    redirect('/login')
                }
            }
 
        })
        return ans
    }

    static post = async (url, data, config = {}) => {
        const nData = data instanceof FormData ? data : { ...data }
        return await this.axiosApi
            .post(url, nData, {
                withCredentials: true,
                headers: getHeaders()
            })
            .then(response => response.data)
    }

    static put = async (url, data, config = {}) => {
        return await this.axiosApi
            .put(url, { ...data }, { ...config })
            .then(response => response.data)
    }

    static del = async (url, config = {}) => {
        return await this.axiosApi
            .delete(url, {
                withCredentials: true,
                headers: getHeaders()
            })
            .then(response => response.data)
    }

}



export default ApiHelper;