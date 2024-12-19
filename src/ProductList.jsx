import React, { useState, useEffect } from 'react'; // ReactのuseStateとuseEffectフックをインポート
import { useSelector, useDispatch } from "react-redux"; // ReduxのuseSelectorとuseDispatchフックをインポート(石川追加)
import './ProductList.css'; // スタイルシートをインポート
import CartItem from './CartItem'; // カートアイテムコンポーネントをインポート

import { addItem } from "./CartSlice"; //(石川追加)

// ProductListコンポーネントの定義
function ProductList() {
    const [showCart, setShowCart] = useState(false); // カートを表示するかどうかの状態管理
    const [showPlants, setShowPlants] = useState(false); // 「About Us」ページを表示するかどうかの状態管理

    //const [addedToCart, setAddedToCart] = useState({}); // カートに追加された商品の状態管理(石川削除)

    const addedToCart = useSelector((state) => state.cart.addedToCart);

    const dispatch = useDispatch();  // dispatchを取得(石川追加)

    // Reduxの状態からitemsを取得(石川追加)
    const items = useSelector((state) => state.cart.items);

    // カート内のアイテム数を取得
    const cartItemCount = items.length; // 配列の長さがそのままアイテム数


    // 植物のデータ配列（カテゴリと詳細）
    const plantsArray = [
        {
            category: "Air Purifying Plants", // カテゴリ名：空気を浄化する植物
            plants: [ // カテゴリ内の植物リスト
                {
                    name: "Snake Plant", // 植物名：サンセベリア
                    image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", // 画像URL
                    description: "Produces oxygen at night, improving air quality.", // 説明：夜間に酸素を生成し、空気質を向上
                    cost: "$15" // 価格
                },
                {
                    name: "Spider Plant", // 植物名：スパイダー・プラント
                    image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", 
                    description: "Filters formaldehyde and xylene from the air.", // 空気中のホルムアルデヒドやキシレンをろ過
                    cost: "$12"
                },
                {
                    name: "Peace Lily", // 植物名：ピースリリー
                    image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg", 
                    description: "Removes mold spores and purifies the air.", // カビの胞子を除去し空気を浄化
                    cost: "$18"
                },
                {
                    name: "Boston Fern", // 植物名：ボストンシダ
                    image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg", 
                    description: "Adds humidity to the air and removes toxins.", // 空気に湿度を追加し毒素を除去
                    cost: "$20"
                },
                {
                    name: "Rubber Plant", // 植物名：ゴムの木
                    image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg", 
                    description: "Easy to care for and effective at removing toxins.", // 世話が簡単で毒素除去に効果的
                    cost: "$17"
                },
                {
                    name: "Aloe Vera", // 植物名：アロエベラ
                    image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg", 
                    description: "Purifies the air and has healing properties for skin.", // 空気を浄化し、肌に対する治癒効果
                    cost: "$14"
                }
            ]
        },
        {
            category: "Aromatic Fragrant Plants", // カテゴリ名：香り高い植物
            plants: [
                {
                    name: "Lavender", // 植物名：ラベンダー
                    image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    description: "Calming scent, used in aromatherapy.", // 落ち着く香りでアロマセラピーに使用
                    cost: "$20"
                },
                {
                    name: "Jasmine", // 植物名：ジャスミン
                    image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    description: "Sweet fragrance, promotes relaxation.", // 甘い香りでリラクゼーションを促進
                    cost: "$18"
                },
                {
                    name: "Rosemary", // 植物名：ローズマリー
                    image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", 
                    description: "Invigorating scent, often used in cooking.", // 活気づける香りで料理に使われる
                    cost: "$15"
                },
                {
                    name: "Mint", // 植物名：ミント
                    image: "https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg", 
                    description: "Refreshing aroma, used in teas and cooking.", // リフレッシュできる香りでお茶や料理に利用
                    cost: "$12"
                },
                {
                    name: "Lemon Balm", // 植物名：レモンバーム
                    image: "https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg", 
                    description: "Citrusy scent, relieves stress and promotes sleep.", // 柑橘系の香りでストレスを軽減し睡眠を促進
                    cost: "$14"
                },
                {
                    name: "Hyacinth", // 植物名：ヒヤシンス
                    image: "https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg", 
                    description: "Hyacinth is a beautiful flowering plant known for its fragrant.", // 美しい花で芳香が特徴
                    cost: "$22"
                }
            ]
        },

        // 植物のカテゴリ「虫よけ植物」を定義
        {
            category: "Insect Repellent Plants", // カテゴリ名: 虫よけ植物
            plants: [ // 各植物のリスト
                {
                    name: "oregano", // 名前: オレガノ
                    image: "https://cdn.pixabay.com/photo/2015/05/30/21/20/oregano-790702_1280.jpg", // 画像URL
                    description: "The oregano plants contains compounds that can deter certain insects.", // 説明: 特定の昆虫を寄せ付けない成分を含む
                    cost: "$10" // 価格: $10
                },
                {
                    name: "Marigold", // 名前: マリーゴールド
                    image: "https://cdn.pixabay.com/photo/2022/02/22/05/45/marigold-7028063_1280.jpg", // 画像URL
                    description: "Natural insect repellent, also adds color to the garden.", // 説明: 天然の虫よけで、庭に色を加える
                    cost: "$8" // 価格: $8
                },
                {
                    name: "Geraniums", // 名前: ゼラニウム
                    image: "https://cdn.pixabay.com/photo/2012/04/26/21/51/flowerpot-43270_1280.jpg", // 画像URL
                    description: "Known for their insect-repelling properties while adding a pleasant scent.", // 説明: 虫よけ効果があり、心地よい香りを提供
                    cost: "$20" // 価格: $20
                },
                {
                    name: "Basil", // 名前: バジル
                    image: "https://cdn.pixabay.com/photo/2016/07/24/20/48/tulsi-1539181_1280.jpg", // 画像URL
                    description: "Repels flies and mosquitoes, also used in cooking.", // 説明: ハエや蚊を寄せ付けず、料理にも使われる
                    cost: "$9" // 価格: $9
                },
                {
                    name: "Lavender", // 名前: ラベンダー
                    image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // 画像URL
                    description: "Calming scent, used in aromatherapy.", // 説明: リラックス効果のある香りでアロマセラピーに利用される
                    cost: "$20" // 価格: $20
                },
                {
                    name: "Catnip", // 名前: キャットニップ
                    image: "https://cdn.pixabay.com/photo/2015/07/02/21/55/cat-829681_1280.jpg", // 画像URL
                    description: "Repels mosquitoes and attracts cats.", // 説明: 蚊を寄せ付けず、猫を引き寄せる
                    cost: "$13" // 価格: $13
                }
            ]
        },
        // 植物のカテゴリ「薬用植物」を定義
        {
            category: "Medicinal Plants", // カテゴリ名: 薬用植物
            plants: [ // 各植物のリスト
                {
                    name: "Aloe Vera", // 名前: アロエベラ
                    image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg", // 画像URL
                    description: "Soothing gel used for skin ailments.", // 説明: 肌のトラブルに用いる癒し効果のあるジェル
                    cost: "$14" // 価格: $14
                },
                {
                    name: "Echinacea", // 名前: エキナセア
                    image: "https://cdn.pixabay.com/photo/2014/12/05/03/53/echinacea-557477_1280.jpg", // 画像URL
                    description: "Boosts immune system, helps fight colds.", // 説明: 免疫システムを強化し、風邪を予防
                    cost: "$16" // 価格: $16
                },
                {
                    name: "Peppermint", // 名前: ペパーミント
                    image: "https://cdn.pixabay.com/photo/2017/07/12/12/23/peppermint-2496773_1280.jpg", // 画像URL
                    description: "Relieves digestive issues and headaches.", // 説明: 消化不良や頭痛を和らげる
                    cost: "$13" // 価格: $13
                },
                {
                    name: "Lemon Balm", // 名前: レモンバーム
                    image: "https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg", // 画像URL
                    description: "Calms nerves and promotes relaxation.", // 説明: 神経を落ち着かせ、リラックス効果を促進
                    cost: "$14" // 価格: $14
                },
                {
                    name: "Chamomile", // 名前: カモミール
                    image: "https://cdn.pixabay.com/photo/2016/08/19/19/48/flowers-1606041_1280.jpg", // 画像URL
                    description: "Soothes anxiety and promotes sleep.", // 説明: 不安を和らげ、睡眠を促進
                    cost: "$15" // 価格: $15
                },
                {
                    name: "Calendula", // 名前: カレンデュラ
                    image: "https://cdn.pixabay.com/photo/2019/07/15/18/28/flowers-4340127_1280.jpg", // 画像URL
                    description: "Heals wounds and soothes skin irritations.", // 説明: 傷を治し、肌の炎症を和らげる
                    cost: "$12" // 価格: $12
                }
            ]
        },
        // 植物のカテゴリ「低メンテナンス植物」を定義
        {
            category: "Low Maintenance Plants", // カテゴリ名: 低メンテナンス植物
            plants: [ // 各植物のリスト
                {
                    name: "ZZ Plant", // 名前: ZZプラント
                    image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // 画像URL
                    description: "Thrives in low light and requires minimal watering.", // 説明: 低光量で育ち、水やりがほとんど不要
                    cost: "$25" // 価格: $25
                },
                {
                    name: "Pothos", // 名前: ポトス
                    image: "https://cdn.pixabay.com/photo/2018/11/15/10/32/plants-3816945_1280.jpg", // 画像URL
                    description: "Tolerates neglect and can grow in various conditions.", // 説明: 放置に耐え、さまざまな環境で育つ
                    cost: "$10" // 価格: $10
                },
                {
                    name: "Snake Plant", // 名前: サンスベリア
                    image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", // 画像URL
                    description: "Needs infrequent watering and is resilient to most pests.", // 説明: 水やりが少なくて済み、害虫に強い
                    cost: "$15" // 価格: $15
                },
                {
                    name: "Cast Iron Plant", // 名前: アスピディストラ
                    image: "https://cdn.pixabay.com/photo/2017/02/16/18/04/cast-iron-plant-2072008_1280.jpg", // 画像URL
                    description: "Hardy plant that tolerates low light and neglect.", // 説明: 低光量と放置に耐える丈夫な植物
                    cost: "$20" // 価格: $20
                },
                {
                    name: "Succulents", // 名前: 多肉植物
                    image: "https://cdn.pixabay.com/photo/2016/11/21/16/05/cacti-1846147_1280.jpg", // 画像URL
                    description: "Drought-tolerant plants with unique shapes and colors.", // 説明: 乾燥に強く、独特な形や色を持つ植物
                    cost: "$18" // 価格: $18
                },
                {
                    name: "Aglaonema", // 名前: アグラオネマ
                    image: "https://cdn.pixabay.com/photo/2014/10/10/04/27/aglaonema-482915_1280.jpg", // 画像URL
                    description: "Requires minimal care and adds color to indoor spaces.", // 説明: 手入れが簡単で、室内に彩りを加える
                    cost: "$22" // 価格: $22
                }
            ]
        }
    ];
    
    // オブジェクトのスタイル設定: 背景色、文字色、パディング、レイアウトなどを指定
    const styleObj = {
        backgroundColor: '#4CAF50', // 背景色を緑色に設定
        color: '#fff!important', // 文字色を白色に設定し、重要として指定
        padding: '15px', // 内側の余白を15pxに設定
        display: 'flex', // フレックスボックスを使用して要素を配置
        justifyContent: 'space-between', // 子要素を左右に均等に配置
        alignItems: 'center', // 子要素を垂直方向に中央揃え
        fontSize: '20px', // フォントサイズを20pxに設定
    };

    // ULタグのスタイル設定: レイアウトと幅を指定
    const styleObjUl = {
        display: 'flex', // フレックスボックスを使用して要素を配置
        justifyContent: 'space-between', // 子要素を左右に均等に配置
        alignItems: 'center', // 子要素を垂直方向に中央揃え
        width: '1100px', // 幅を1100pxに設定
    };

    // Aタグのスタイル設定: リンクの見た目を指定
    const styleA = {
        color: 'white', // リンクの文字色を白色に設定
        fontSize: '30px', // フォントサイズを30pxに設定
        textDecoration: 'none', // 下線を削除
    };

    // カートアイコンクリック時のイベント処理
    const handleCartClick = (e) => {
        e.preventDefault(); // ブラウザが通常行うクリック時のデフォルトのリンク動作をキャンセル（href="#" のデフォルト動作（ページトップへの移動）が無効化。）
        setShowCart(true); // カートを表示する状態に設定
    };

    // "Plants"リンククリック時のイベント処理
    const handlePlantsClick = (e) => {
        e.preventDefault(); // デフォルトのリンク動作をキャンセル
        setShowPlants(true); // "Plants"画面を表示する状態に設定
        setShowCart(false); // カートを非表示に設定
    };

    // 買い物を続けるボタンのクリック時のイベント処理
    const handleContinueShopping = (e) => {
        e.preventDefault(); // デフォルトのリンク動作をキャンセル
        setShowCart(false); // カートを非表示に設定
    };

    // コンソールにitemsの中身を表示（石川追記）
    useEffect(() => {
        console.log("items:",items);  // itemsの内容をコンソールに表示
        console.log("addedToCart:",addedToCart);  // addedToCartの内容をコンソールに表示
    }, [items]);  // itemsが変化するたびに実行

    // カートに商品を追加する処理
    const handleAddToCart = (product) => {
        console.log("addedToCart(dispatch前)：",addedToCart)
        
        dispatch(addItem(product)); // Reduxのアクションをディスパッチして商品をカートに追加
        
        //setAddedToCart((prevState) => ({
        //...prevState, // 以前の状態を維持
        //[product.name]: true, // 商品名をキーとして値をtrueに設定、追加済みを示す
        //}));

        console.log("addedToCart(dispatch後)：",addedToCart)

        ///console.log("addedToCart",addedToCart)

    };

    // JSXを返す関数
    return (
        <div>
            {/* ナビゲーションバーの作成 */}
            <div className="navbar" style={styleObj}>
                <div className="tag">
                    {/* ロゴとサイト名セクション */}
                    <div className="luxury">
                        {/* ロゴ画像を表示 */}
                        <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" />
                        {/* サイト名とキャッチフレーズのリンク */}
                        <a href="/" style={{ textDecoration: 'none' }}>
                            <div>
                                <h3 style={{ color: 'white' }}>Paradise Nursery</h3> {/* サイト名 */}
                                <i style={{ color: 'white' }}>Where Green Meets Serenity</i> {/* キャッチフレーズ */}
                            </div>
                        </a>
                    </div>
                </div>

                {/* ナビゲーションメニュー */}
                <div style={styleObjUl}>
                    {/* Plantsページへのリンク */}
                    <div className="plantsPages">
                        <a href="#" onClick={(e) => handlePlantsClick(e)} style={styleA}>
                            Plants
                        </a>
                    </div>

                    {/* カートページへのリンク */}
                    <div className="cartPages">
                        <a href="#" onClick={(e) => handleCartClick(e)} style={styleA}>
                            <h1 className='cart'>
                                {/* カートアイコンをSVGで描画 */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="IconChangeColor" height="68" width="68">
                                    <rect width="156" height="156" fill="none"></rect>
                                    
                                {/* アイテム数のバッジ */}
                                <circle cx="128" cy="128" r="36" fill="red"></circle>  {/* バッジの円形 */}
                                <text 
                                    x="128" /* 横方向の中央位置 */
                                    y="130" /* 縦方向の中央位置 */
                                    textAnchor="middle"  /* 水平中央揃え */
                                    alignmentBaseline="middle"  /* 垂直中央揃え */
                                    fontSize="38"  /* フォントサイズ */
                                    fill="white"  /* フォント色 */
                                    fontWeight="bold"  /* 太字 */
                                >
                                    {cartItemCount}
                                </text>

                                    <circle cx="80" cy="216" r="12"></circle> {/* 左車輪 */}
                                    <circle cx="184" cy="216" r="12"></circle> {/* 右車輪 */}
                                    <path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8" 
                                        fill="none" stroke="#faf9f9" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                        id="mainIconPathAttribute">
                                    </path> {/* カートのフレーム */}
                                </svg>

                                {/* アイコンの右上にアイテム数を表示 */}
                                {/*
                                {console.log("Cart Item Count (表示中):", cartItemCount)}
                                {cartItemCount > 0 && (
                                <span className="cart-badge">{cartItemCount}</span>
                                )}
                                */}

                            </h1>
                        </a>
                    </div>  
                </div>
            </div>

            {/* カート表示フラグに基づくコンテンツ切り替え */}
            {!showCart ? (
                <div className="product-grid">
                    {/* 商品カテゴリごとのリストを表示 */}
                    {plantsArray.map((category, index) => (
                                <div key={index}>
                                    {/* カテゴリ名を表示 */}
                                    <h1>
                                        <div>{category.category}</div>
                                    </h1>

                                    <div className="product-list">
                                        {/* 各商品の情報をカード形式で表示 */}
                                        {category.plants.map((plant, plantIndex) => (
                                                <div className="product-card" key={plantIndex}>
                                                    {/* 商品画像 */}
                                                    <img className="product-image" src={plant.image} alt={plant.name} />
                                                    {/* 商品名 */}
                                                    <div className="product-title">{plant.name}</div>
                                                    {/* 商品詳細や価格も同様に表示可能 */}
                                                    <button
                                                        className="product-button"
                                                        onClick={() => handleAddToCart(plant)}
                                                        disabled={addedToCart[plant.name]} // カートに追加済みならボタンを無効化
                                                    >

                                                        {addedToCart[plant.name] ? "Added" : "Add to Cart"}

                                                    </button>
                                                </div>
                                                )
                                            )
                                        }
                                    </div>
                                </div>
                            )
                        )
                    }
                </div>
            ) : (
                // カートが表示されている場合、CartItemコンポーネントを表示
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;
