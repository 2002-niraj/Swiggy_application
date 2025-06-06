import { configureStore} from "@reduxjs/toolkit"

import cartReducer from "../features/cart/cartSlice"
import loginSlice from "../features/login/loginSlice"
import restoSlice from "../features/restoList/restoSlice";
import registerSlice from "../features/signup/registerSlice"
import menuSlice from "../features/menuList/menuSlice"
import locationSlice from "../features/location/locationSlice"

const Store = configureStore({
    reducer:{
        cart:cartReducer,
        login:loginSlice,
        register:registerSlice,
        list:restoSlice,
        menu:menuSlice,
        location:locationSlice
    }
});

export default Store;