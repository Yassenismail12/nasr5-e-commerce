import axiosClient from "./axiosClient";

export const getProducts = async ({limit=12, skip=0} = {}) => {
    const {data} = await axiosClient.get('/products', {params: {limit,skip}})
    return data;
}

export const getProductById = async (id) => {
    const {data} = await axiosClient.get(`/products/${id}`)
    return data;
}

export const searchProducts = async (query) => {
    const {data} = await axiosClient.get(`/products/search`, {params:{q:query}})
    return data;
}

export const getCategories = async () => {
    const {data} = await axiosClient.get('/products/categories')
    return data;
}

export const getProductsByCategory = async (slug) => {
    const {data} = await axiosClient.get(`/products/categories/${slug}`)
    return data;
}