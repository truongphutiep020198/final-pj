
import { PRODUCT_LIMIT } from "store/slices/productSlice/productSlice";
import { API, URL_API } from "./const.api";

export const ProductAPI = {
    fetchProduct: (page) => {
        const queryParam = `?_page=${page}&_limit=${PRODUCT_LIMIT}`;

        return API.get(`${URL_API}/products${queryParam}`);
    },
    searchProduct: (text) => {

        return API.get(`${URL_API}/products?q=${text}`);
    },
};