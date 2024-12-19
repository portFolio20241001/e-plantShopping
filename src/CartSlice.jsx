// Redux ToolkitからcreateSliceをインポート
import { createSlice } from '@reduxjs/toolkit';

// カートの状態を管理するスライスを作成
export const CartSlice = createSlice({
  // スライスの名前
  name: 'cart',
  // 初期状態の設定
  initialState: {
    items: [], // アイテムを空の配列で初期化
    addedToCart: {},
  },
  // レデューサー（状態を変更する関数）
  reducers: {
    // アイテムをカートに追加する処理
    addItem: (state, action) => {
      const { name, image, cost } = action.payload; // 追加するアイテムの情報を取得
      // 既に同じ名前のアイテムがカートにあるか確認
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++; // アイテムが既に存在する場合は数量を1増加
      } else {
        // アイテムが存在しない場合は新しいアイテムをカートに追加
        state.items.push({ name, image, cost, quantity: 1 });

        state.addedToCart[name]=true
      }

      console.log("add処理")
      console.log("action:",action)
      console.log("state.items:",state.items)

    },
    // アイテムをカートから削除する処理
    removeItem: (state, action) => {
      // アイテム名でフィルタリングして削除
      state.items = state.items.filter(item => item.name !== action.payload);

      // `action.payload` は削除対象のアイテム名を想定
      const itemName = action.payload;

      // addedToCart から該当するキーを false に設定
      state.addedToCart = {
        ...state.addedToCart,
        [itemName]: false // ここで既存の状態を保持しつつ更新
      };

    },
    // アイテムの数量を更新する処理
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload; // 更新するアイテムの情報を取得
      // 対象のアイテムをカートから探す
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity; // アイテムが見つかった場合、数量を更新
      }
    },
  },
});

// 生成したアクションをエクスポート
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// カートの状態を管理するリデューサーをエクスポート
export default CartSlice.reducer;
