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
    searchProductByCategory (page, categoryId) {

    },
    searchProductByProductName(page, productName) {

    },
    deleteProduct(id) {
        const url = `/api/product/delete/${id}`
        return axiosClient.delete(url)
    },    
}

export default AdminApi