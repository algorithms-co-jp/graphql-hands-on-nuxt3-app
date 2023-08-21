# タスク管理アプリ
タスクの管理とコメントの追加ができるシンプルなWebアプリケーションです。Vue 3とNuxt 3を利用して開発されており、バックエンドとしてHasuraのGraphQLエンドポイントを使用しています。  
このアプリケーションは、「[GraphQL完全理解ハンズオン](https://algorithms.connpass.com/event/292066/)」で解説しているアプリケーションのフロントエンド部分です。

## 機能
* タスクの追加、表示
* タスクの完了/未完了のトグル
* タスクごとのコメントの追加と表示
* タスクの作成日時を日本時間での表示

## セットアップ
1. Hasuraのセットアップは、以下のリポジトリを参照してください: [graphql-hands-on-hasura](https://github.com/algorithms-co-jp/graphql-hands-on-hasura)
2. このアプリの依存関係をインストール: `npm install`
3. 開発サーバーの起動: `npm run dev`

アプリケーションは http://localhost:3000 でアクセス可能です。

## 使用技術
* Vue 3
* Nuxt 3
* Hasura
* @urql/vue
* GraphQL
* date-fns
* date-fns-tz

## 注意事項
本アプリでは、GraphQLへのアクセスに`x-hasura-admin-secret`を使用しています。  
実際のWebアプリケーションでは、セキュリティの観点からJWT認証などの実装が必要です。