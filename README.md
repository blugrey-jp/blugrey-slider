# BLUGREY - Yahoo Shopping API Slider

Yahoo Shopping APIから自動で新着商品を取得してスライド表示するシステムです。

## ファイル構成

```
blugrey-slider/
├── package.json          # Node.jsプロジェクト設定
├── netlify.toml          # Netlify設定
├── netlify/functions/
│   └── slider.js         # Yahoo APIを中継するサーバーレス関数
└── public/
    └── index.html        # フロントエンド
```

## セットアップ

1. GitHubにこれらのファイルをアップロード
2. Netlifyに接続
3. 自動でデプロイされます

## カスタマイズ

`public/index.html`の以下の行を変更：

```javascript
const QUERY = 'モデルカー';  // 検索キーワード
const RESULTS = 12;          // 表示件数
```

## APIエンドポイント

```
/.netlify/functions/slider?query=モデルカー&results=12&callback=handleSliderResponse
```

## 商用利用

このコードはNetlifyの無料プランで商用利用可能です。
