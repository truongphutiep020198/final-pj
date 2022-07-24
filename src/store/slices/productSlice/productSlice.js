import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";

export const PRODUCT_LIMIT = 12;

const initialState = {
    productState: {
        data: [],
        loading: false,
        error: null,
        searchText: [],
        // Thông tin phân trang
        pagination: {
            // Trang hiện tại
            page: 1,
            // Số record trả về trong 1 trang
            limit: PRODUCT_LIMIT,
            // Tổng số record từ server
            total: null,
            // Tổng số trang
            totalPage: null,
        },
    },
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        fetchProductAction: (state, action) => {
            const page = action.payload;

            state.productState = {
                ...state.productState,
                loading: true,
                pagination: {
                    ...state.productState.pagination,
                    page,
                },
            };
        },
        fetchProductActionSuccess: (state, action) => {
            const { data, totalProduct } = action.payload;

            state.productState = {
                ...state.productState,
                data,
                loading: false,
                pagination: {
                    ...state.productState.pagination,
                    total: +totalProduct,
                    totalPage: totalProduct / PRODUCT_LIMIT,
                },
            };
        },
        fetchProductActionFailed: (state, action) => {
            notification.error(action.payload);
        },
        searchProductAction: (state, action) => {
            const { data } = action.payload;
            state.productState = {
                ...state.productState,
                loading: true,
                searchText: data,
            };
        },
    },
});

export const {
    fetchProductAction,
    fetchProductActionSuccess,
    fetchProductActionFailed,
    searchProductAction,
} = productSlice.actions;

export const productReducer = productSlice.reducer;