import { configureStore } from '@reduxjs/toolkit'; // Redux ToolkitからconfigureStoreをインポート
import cartReducer from './CartSlice'; // CartSliceで定義したreducerをインポート

// storeを設定する
const store = configureStore({
    reducer: {
        cart: cartReducer, // cartという状態に対してcartReducerを適用
    },
});

export default store; // storeをエクスポートして、アプリ全体で使用できるようにする
