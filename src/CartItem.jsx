// Reactライブラリをインポート
import React from 'react';
// Reduxから必要なフックをインポート
import { useSelector, useDispatch } from 'react-redux';
// カートに関するアクションをインポート
import { removeItem, updateQuantity } from './CartSlice';
// カートのスタイルをインポート
import './CartItem.css';



// CartItemコンポーネントの定義
const CartItem = ({ onContinueShopping }) => {
  // Reduxストアからカートの状態を取得
  const cart = useSelector(state => state.cart.items);
  // Reduxアクションをディスパッチするためのフック
  const dispatch = useDispatch();

  //const addedToCart = useSelector((state) => state.cart.addedToCart);

  // 合計金額の計算関数
  const calculateTotalAmount = () => {
    let totalAmount = 0; // 合計金額を格納する変数
    // カート内の各アイテムの合計を計算
    cart.forEach(item => {

      console.log("item.cost:",item.cost)
      console.log("item.quantity:",item.quantity)
      console.log("totalAmount:",totalAmount)

      // "$" を取り除き、parseFloatで数値に変換
      const itemCost = parseFloat(item.cost.replace('$', ''));
      const itemQuantity = parseInt(item.quantity)

      totalAmount += itemCost * itemQuantity; // 単価×数量を加算

      console.log("itemCost:",itemCost)
      console.log("itemQuantity:",itemQuantity)
      console.log("totalAmount:",totalAmount)
      

    });
    return totalAmount; // 計算結果を返す
  };

  // ショッピングを続ける処理　これは不要
  //const handleContinueShopping = () => {
  //  console.log("onContinueShoppingクリック1：")
  //  onContinueShopping(); // 親コンポーネントから渡された関数を実行
  //  console.log("onContinueShoppingクリック2：")
  //};

  // 数量を増やす処理
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 })); // 数量を1増やして更新
  };

  // 数量を減らす処理
  const handleDecrement = (item) => {
    if (item.quantity > 1) { // 数量が1より大きい場合のみ減らす
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 })); // 数量を1減らして更新
    }
  };

  // 商品をカートから削除する処理
  const handleRemove = (item) => {

    dispatch(removeItem(item.name)); // 商品名を基に削除アクションをディスパッチ

  };

  // 商品の合計金額を計算する関数
  const calculateTotalCost = (item) => {
    let totalItemCost = 0;

    // "$" を取り除き、parseFloatで数値に変換
    const itemCost = parseFloat(item.cost.replace('$', ''));
    const itemQuantity = parseInt(item.quantity)

    totalItemCost = itemCost * itemQuantity // 単価×数量を計算

    return totalItemCost; 
  };

  // チェックアウト処理（仮）
  const handleCheckoutShopping = () => {
    alert('チェックアウト処理を追加予定です'); // チェックアウト機能を後で実装予定
  };

  // JSXを返す
  return (
    <div className="cart-container">
      {/* 合計金額を表示 */}
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {/* カート内のアイテムをマッピングして表示 */}
        {cart.map(item => (
          <div className="cart-item" key={item.name}> {/* 各商品を一意に識別 */}
            {/* 商品画像を表示 */}
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              {/* 商品名 */}
              <div className="cart-item-name">{item.name}</div>
              {/* 商品単価 */}
              <div className="cart-item-cost">{item.cost}</div>
              {/* 数量管理 */}
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)} // 数量を減らす
                >
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span> {/* 現在の数量を表示 */}
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)} // 数量を増やす
                >
                  +
                </button>
              </div>
              {/* 商品の合計金額 */}
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              {/* 商品を削除するボタン */}
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)} // 商品を削除
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* 合計金額を再表示するためのエリア */}
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      {/* ショッピング継続ボタンとチェックアウトボタン */}
      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={onContinueShopping} // 直接親コンポーネントから渡された関数を呼び出す
        >
          Continue Shopping
        </button>
        <br />
        <button
          className="get-started-button1"
          onClick={() => handleCheckoutShopping()} // チェックアウト処理を実行（仮）
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

// CartItemコンポーネントをデフォルトエクスポート
export default CartItem;
