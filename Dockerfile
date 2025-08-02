# 1. ベースイメージを指定
FROM node:18-alpine

# 2. 作業ディレクトリを作成・設定
WORKDIR /app

# 3. package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 4. 依存関係をインストール
RUN npm install

# 5. アプリケーションのソースコードをコピー
COPY . .

# 6. 必要に応じてビルドステップ（例：Reactなどの場合）
# RUN npm run build

# 7. コンテナ起動時に実行するコマンドを指定
CMD ["npm", "start"]
