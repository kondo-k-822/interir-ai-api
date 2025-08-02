# InterirAI - インテリアデザイン支援AI

このプロジェクトは、AIを活用してインテリアデザインの提案を行うNode.js（TypeScript）アプリケーションです。Gemini APIを使用して画像生成やテキスト生成を行い、ユーザーに最適なインテリアデザインを提供します。

## 目次

- [インストール](#インストール)
- [使い方](#使い方)
- [エンドポイント](#エンドポイント)

## インストール

1. リポジトリをクローンします:
   ```
   git clone https://github.com/kondo-k-822/interir-ai-api.git
   ```
2. プロジェクトディレクトリに移動します:
   ```
   cd interir-ai-api
   ```
3. 依存パッケージをインストールします:
   ```
   npm install
   ```


## 使い方

1. `.env`ファイルをプロジェクトの直下に作成し、以下の内容を記載してください:

```
GOOGLE_API_KEY=あなたのGemini APIキー
```

2. アプリケーションを起動するには、次のコマンドを実行してください:
```
npm start
```

3. アプリケーションが起動し、リクエストの待ち受けを開始します。

## エンドポイント

### POST `/api/imageMake`

インテリアデザインの提案を生成します。

- **リクエストボディ**:
  ```json
  {
  "imagePath": "images/sample.png",
  "prompt": "現在の写真に合う家具を配置してください"
  }

## Gemini API キー
以下を参考に取得すること。
https://ai.google.dev/gemini-api/docs/api-key?hl=ja