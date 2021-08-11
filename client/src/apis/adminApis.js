import axiosClient from './AxiosClient'

const AdminApi = {
    getCategoryList() {
        const url = '/api/category/admin/list'
        return axiosClient.get(url)
    },
    updateCategory(id, data) {
        const url = `/api/category/update/${id}`;
        return axiosClient.put(url, data)
    },
    addCategory(data) {
        const url = '/api/category/create';
        return axiosClient.post(url, data)
    },
}

export default AdminApi