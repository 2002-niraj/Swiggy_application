import { configureStore,combineReducers} from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // this uses localStorage


import cartReducer from "../features/cart/cartSlice"
import loginSlice from "../features/login/loginSlice"
import restoSlice from "../features/restoList/restoSlice";
import registerSlice from "../features/signup/registerSlice"
import menuSlice from "../features/menuList/menuSlice"
import locationSlice from "../features/location/locationSlice"
import orderSlice from "../features/order/orderSlice";
import OrderHistory from "../features/orderHistory/orderHistorySlice";

// 1️⃣ Combine all reducers
const rootReducer = {
    cart: cartReducer,
    login: loginSlice,
    register: registerSlice,
    list: restoSlice,
    menu: menuSlice,
    location: locationSlice,
    order: orderSlice,
    orderHistory: OrderHistory
};

// 2️⃣ Create persist config
const persistConfig = {
    key: 'root',
    storage, // use localStorage
    whitelist: ['cart', 'login', 'menu','location','orderHistory'] // only persist these slices
}

// 3️⃣ Wrap your root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, combineReducers(rootReducer));

//// 4️⃣ Create store using persistedReducer
const Store = configureStore({
    reducer: persistedReducer,

});

// 5️⃣ Export persistor
export const persistor = persistStore(Store);

export default Store;