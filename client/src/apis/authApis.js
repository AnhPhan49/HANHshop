import axiosClient from './AxiosClient'

const AuthApis = {
    login(credentials) {
        const url = '/api/auth/login'
        return axiosClient.post(url, credentials)
    },
    register(credentials) {
        const url = '/api/auth/register'
        return axiosClient.post(url, credentials)
    },
    setHeaderAxios(token) {
        axiosClient.defaults.headers.common['Authorization'] = 'Bearer ' + token
    },
    
}

export default AuthApis