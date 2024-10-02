import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth-slice'
import  addNewProductSlice  from './admin/productsSlice'
import ShopingProductSlice from './shop/productSlice'
import shoopingCartSlice from './shop/cartSlice/cartSlice'
import AddressSlice from './shop/AddreeSlice/addressSlice'
import ShopingOrderSlice from './shop/OrderSlice/orderSlice'

const store = configureStore({
    reducer : {
        auth : authReducer,
        adminProduct : addNewProductSlice,
        ShopingProduct : ShopingProductSlice,
        ShopingCart : shoopingCartSlice,
        shopingaddress : AddressSlice,
        shopOrder : ShopingOrderSlice
    }
})

export default store