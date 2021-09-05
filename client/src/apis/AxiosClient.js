import axios from 'axios';
import alert from '../utils/alert'

const axiosClient = axios.create({
    headers: {
        headers: {
            'content-type': 'application/json',
            "Content-Type": "multipart/form-data"},
    }
})

//handle access token
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if(token)        
        config.headers.Authorization = `Bearer ${token}`
    return config
},(error) => Promise.reject(error));

//handle error
const handleError = (error) => {    
    if(error)
        alert({icon : 'error',title : 'Error',msg : error.response.data.message})
    else
        alert({icon : 'error',title : 'Error',msg : 'No response!'})
}

//handle response
axiosClient.interceptors.response.use((res) => {
    if(res && res.data){
        return {...res.data, status: res.status}
    }
    return res
}, (err) => {
    const statusCode = err.response.status;
    switch(statusCode) {
        case 401:
            window.location.replace('/login')
            localStorage.removeItem("token")
            break
        case 400:            
            handleError(err)
            break
        case 403:
            alert({icon : 'error',title : 'Error',message: '403 Forbidden' })
            break
        case 404:
            alert({icon : 'error',title : 'Error',message: '404 Not Found' })
            break
        case 405:
            alert({icon : 'error',title : 'Error',message: 'Bạn không thể thao tác vào mục này' })
            break
        case 500:
            alert({icon : 'error',title : 'Error',message: '404 Not Found' })
             break
        default:
            alert({icon : 'error',title : 'Error',msg : '500 Internal Server Error'})
    
    }
    return Promise.reject(err);
})

export default axiosClient