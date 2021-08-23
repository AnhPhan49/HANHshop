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
    // Inventory
    getInventoryList(page){
       const url=`/api/inventory/search?page=${page}`
       return axiosClient.get(url)
    },
    updateInventory(id, data) {
        const url = `/api/inventory/update/${id}`;
        return axiosClient.put(url, data)
    },
    // End_Inventory
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
    updateProduct(productId, data) {
        const url = `/api/product/update/${productId}`
        return axiosClient.put(url, data)
    },
    deleteProduct(productId) {
        const url = `/api/product/delete/${productId}`
        return axiosClient.delete(url)
    },
    getManagerAccountList() {
        const url = '/api/user/list/manager'
        return axiosClient.get(url)
    },
    getCustomerAccountList() {
        const url = '/api/user/list/customer'
        return axiosClient.get(url)
    },
    createManagerAccount(data) {
        const url = '/api/user/create-manager'
        return axiosClient.post(url, data)
    },
    adminChangeManagerPassword(id, data) {
        const url = `/api/user/admin/change-password/${id}`
        return axiosClient.put(url, data)
    },
    blockAccount(id) {
        const url = `/api/user/block/${id}`
        return axiosClient.delete(url)
    }
}

export default AdminApi