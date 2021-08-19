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
    getProductList(page) {
        const url = `/api/product/search?page=${page}`
        return axiosClient.get(url)
    },
    addProduct(data) {
        const url = '/api/product/create'
        return axiosClient.post(url, data)
    },
    searchProductByCategory(page, categoryId) {
        const url = `/api/product/search?page=${page}&category=${categoryId}`
        return axiosClient.get(url)
    },
    searchProductByProduct(page, product) {
        const url = `/api/product/search?page=${page}&name=${product}`
        return axiosClient.get(url)
    },
    searchProductByCategoryAndProduct(page, categoryId, product) {
        const url = `/api/product/search?page=${page}&name=${product}&category=${categoryId}`
        return axiosClient.get(url)
    },
    deleteProduct(id) {
        const url = `/api/product/delete/${id}`
        return axiosClient.delete(url)
    },    
}

export default AdminApi