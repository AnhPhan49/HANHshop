import axiosClient from './AxiosClient'

const ShopApi = {
    getHomePageHotProductData(page, status) {
        const url = `/api/product/search?page=${page}&status=${status}`
        return axiosClient.get(url)
    }
}

export default ShopApi