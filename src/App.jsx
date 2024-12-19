// ReactとuseStateフックをインポート（状態管理に使用）
import React, { useState } from 'react';
// ProductListコンポーネントをインポート（商品リストを表示するためのコンポーネント）
import ProductList from './ProductList';
// アプリケーションのスタイルを定義したCSSファイルをインポート
import './App.css';
// AboutUsコンポーネントをインポート（「私たちについて」セクションを表示するためのコンポーネント）
import AboutUs from './AboutUs';

// Appコンポーネントの定義（アプリ全体のメインコンポーネント）
function App() {

  // showProductListという状態を定義し、初期値はfalse
  const [showProductList, setShowProductList] = useState(false);

  // 「Get Started」ボタンがクリックされた時の処理を定義
  const handleGetStartedClick = () => {
    // showProductListをtrueに設定（商品リストを表示）
    setShowProductList(true);
  };

  // Appコンポーネントのレンダリング内容を定義
  return (
    // アプリ全体のコンテナを定義するdiv
    <div className="app-container">
      {/* ランディングページのコンテナ */}
      <div className={`landing-page ${showProductList ? 'fade-out' : ''}`}>
        {/* 背景画像のためのdiv */}
        <div className="background-image"></div>
        {/* コンテンツエリア */}
        <div className="content">
          {/* ランディングページのテキストやボタン */}
          <div className="landing_content">
            {/* ウェルカムメッセージ */}
            <h1>Welcome To Paradise Nursery</h1>
            {/* 横線の区切り */}
            <div className="divider"></div>
            {/* サブメッセージ */}
            <p>Where Green Meets Serenity</p>
            {/* 「Get Started」ボタン */}
            <button className="get-started-button" onClick={handleGetStartedClick}>
              Get Started
            </button>
          </div>
          {/* 「私たちについて」セクション */}
          <div className="aboutus_container">
            <AboutUs />
          </div>
        </div>
      </div>
      {/* 商品リストのコンテナ */}
      <div className={`product-list-container ${showProductList ? 'visible' : ''}`}>
        {/* 商品リストを表示するコンポーネント */}
        <ProductList />
      </div>
    </div>
  );
}

// Appコンポーネントをエクスポート（他のファイルで使用可能にする）
export default App;
