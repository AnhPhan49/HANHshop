import axiosClient from './AxiosClient'

const ShopApi = {
    getHomePageHotProductData(page, status) {
        const url = `/api/product/search?page=${page}&status=${status}`
        return axiosClient.get(url)
    },
    getCategoryList() {
        const url = '/api/category/list'
        return axiosClient.get(url)
    },
    getProductDetail(id) {
        const url = `/api/product/get/${id}`
        return axiosClient.get(url)
    },
    addToCart(data) {
        const url = '/api/cart/add'
        return axiosClient.put(url, data)
    },
    getCart() {
        const url = '/api/cart/get'
        return axiosClient.get(url)
    }
}

export default ShopApi