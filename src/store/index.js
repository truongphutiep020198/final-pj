import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/shopping-cart/cartSlice";
import cartUiSlice from "./slices/shopping-cart/cartUiSlice";
import { userReducer } from "./slices/userSlice/userSlice";
import { productReducer } from "./slices/productSlice/productSlice";

import createSagaMiddleware from "redux-saga";
import { mySaga } from "./sagas";


const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware];

const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
        cart: cartSlice.reducer,
        cartUi: cartUiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), ...middleware],
});

export default store;
sagaMiddleware.run(mySaga);