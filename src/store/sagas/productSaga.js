import { put, takeEvery, delay } from "redux-saga/effects";

import { ProductAPI } from "api/product.api.js";
import { fetchProductAction, fetchProductActionFailed, fetchProductActionSuccess, searchProductAction } from "store/slices/productSlice/productSlice";

function* fetchProduct(action) {
    try {
        yield delay(500);
        const response = yield ProductAPI.fetchProduct(action.payload);
        const productData = response.data;
        const totalProduct = response.headers["x-total-count"];
        console.log(response);

        // Put 1 action đã được định nghĩa ở slice
        yield put(
            fetchProductActionSuccess({
                data: productData,
                totalProduct: totalProduct,
            })
        );
    } catch (e) {
        // Put 1 action đã được định nghĩa ở slice
        yield put(fetchProductActionFailed(e.response.data));
    }
}

function* searchProduct(action) {
    try {
        yield delay(500);
        const response = yield ProductAPI.searchProduct(action.payload);
        console.log(response);
        const searchProduct = response.data;
        // Put 1 action đã được định nghĩa ở slice
        yield put(
            searchProductAction({
                searchText: searchProduct,
            })
        );
    } catch (e) {
        // Put 1 action đã được định nghĩa ở slice
        yield put(fetchProductActionFailed(e.response.data));
    }
}

export function* productSaga() {
    yield takeEvery(fetchProductAction, fetchProduct);
    yield takeEvery(searchProductAction, searchProduct);
}