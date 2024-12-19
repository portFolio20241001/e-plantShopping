// Reactライブラリをインポート（Reactコンポーネント作成に使用）
import React from 'react';
// AboutUsコンポーネント専用のスタイルをインポート
import './AboutUs.css';

// AboutUsコンポーネントの定義
function AboutUs() {
  // コンポーネントが返すHTML（JSX）を定義
  return (
    // About Usセクションのコンテナ
    <div className="about-us-container">
      {/* セクションの見出し（コメントアウト中） */}
      {/* <h1 className="about-us-heading">About Us</h1> */}
      
      {/* 概要を説明するパラグラフ */}
      <p className="about-us-description">Welcome to Paradise Nursery, where green meets serenity!</p>
      
      {/* 施設や使命について詳しく説明するパラグラフ */}
      <p className="about-us-content">
        At Paradise Nursery, we are passionate about bringing nature closer to you. Our mission is to provide a wide range of 
        high-quality plants that not only enhance the beauty of your surroundings but also contribute to a healthier and 
        more sustainable lifestyle. From air-purifying plants to aromatic fragrant ones, we have something for every 
        plant enthusiast.
      </p>
      
      {/* 左側にロゴを表示するコード（コメントアウト中） */}
      {/* <p className="plant_logo_left"><img src="https://p1.hiclipart.com/preview/922/979/640/green-leaf-logo-emoji-seedling-emoticon-sticker-plant-plant-stem-flower-png-clipart-thumbnail.jpg" height='50px' width='50px' alt="" /></p> */}
      
      {/* チームの専門性や品質へのこだわりを説明するパラグラフ */}
      <p className="about-us-content">
        Our team of experts is dedicated to ensuring that each plant meets our strict standards of quality and care. 
        Whether you're a seasoned gardener or just starting your green journey, we're here to support you every step of 
        the way. Feel free to explore our collection, ask questions, and let us help you find the perfect plant for your 
        home or office.
      </p>
      
      {/* 右側にロゴを表示するコード（コメントアウト中） */}
      {/* <p className="plant_logo_right"><img src="https://p1.hiclipart.com/preview/922/979/640/green-leaf-logo-emoji-seedling-emoticon-sticker-plant-plant-stem-flower-png-clipart-thumbnail.jpg" height='50px' width='50px' alt="" /></p> */}
      
      {/* 最後のメッセージとして、施設訪問の勧誘を記載 */}
      <p className="about-us-content">
        Join us in our mission to create a greener, healthier world. Visit Paradise Nursery today and experience the 
        beauty of nature right at your doorstep.
      </p>
    </div>
  );
}

// AboutUsコンポーネントをエクスポート（他のファイルで使用可能にする）
export default AboutUs;
