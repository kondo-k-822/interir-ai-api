# InterirAI - インテリアデザイン支援AI

このプロジェクトは、AIを活用してインテリアデザインの提案を行うNode.js（TypeScript）アプリケーションです。Gemini APIを使用して画像生成やテキスト生成を行い、ユーザーに最適なインテリアデザインを提供します。 

## 目次

- [インストール](#インストール)
- [使い方](#使い方)
- [エンドポイント](#エンドポイント)
  - [インテリア提案生成 API](#post-apiimagemake)
  - [認証 API](#認証-api)

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

* **リクエストボディ**

  ```json
  {
    "imagePath": "images/sample.png"
  }
  ```

  ## 🔑 認証 API

### 1. サインアップ（ユーザー登録）

* **URL**: `/signup`
* **メソッド**: `POST`

**リクエストボディ**

```json
{
  "email": "user@example.com",
  "password": "P@ssword123!"
}
```

**レスポンス (成功時)**

```json
{
  "message": "ユーザー登録完了",
  "user": {
    "id": 1,
    "email": "user@example.com"
  }
}
```

---

### 2. ログイン

* **URL**: `/login`
* **メソッド**: `POST`

**リクエストボディ**

```json
{
  "username": "user@example.com",
  "password": "P@ssword123!"
}
```

**レスポンス (成功時)**

```json
{
  "message": "ログイン成功",
  "user": {
    "id": 1,
    "email": "user@example.com"
  }
}
```

---

### 3. ログアウト

* **URL**: `/logout`
* **メソッド**: `POST`
* **リクエストボディ**: なし

**レスポンス (成功時)**

```json
{
  "message": "ログアウトしました"
}
```

## Gemini API キー
以下を参考に取得すること。
https://ai.google.dev/gemini-api/docs/api-key?hl=ja