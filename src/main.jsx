// Reactライブラリをインポート（Reactコンポーネント作成に使用）
import React from 'react';
// ReactDOMライブラリをインポート（ReactコンポーネントをDOMにマウントするために使用）
import ReactDOM from 'react-dom/client';
// Appコンポーネントをインポート（アプリケーションのメインコンポーネント）
import App from './App.jsx';
// 共通のCSSファイルをインポート（スタイルを適用）
import './index.css';
// ReduxのProviderをインポート（Reduxストアをアプリ全体に提供するために使用）
import { Provider } from 'react-redux';
// Reduxのストアをインポート（アプリケーションの状態管理に使用）
import store from './store.js';

// ReactアプリケーションをDOMにレンダリングする処理
ReactDOM.createRoot(document.getElementById('root')).render(
  // ReactのStrictModeでアプリをラップ（開発時に潜在的な問題を検出するために使用）
  <React.StrictMode>
    {/* ReduxのProviderでアプリをラップし、全コンポーネントにストアを提供 */}
    <Provider store={store}>
      {/* アプリケーションのメインコンポーネントをレンダリング */}
      <App />
    </Provider>
  </React.StrictMode>,
);
