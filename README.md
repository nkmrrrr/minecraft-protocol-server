# Minecraft Protocol Server

このプロジェクトはMinecraftプロトコルを実装したサーバーです。Minecraftクライアントと通信し、基本的なサーバー機能を提供します。

## 機能

- Minecraft通信プロトコルの実装
- プレイヤー認証とログイン処理
- 基本的なチャット機能
- シンプルなワールド管理

## インストール

```bash
# リポジトリをクローン
git clone https://github.com/nkmrrrr/minecraft-protocol-server.git
cd minecraft-protocol-server

# 依存関係のインストール
npm install
```

## 使い方

```bash
# サーバーの起動
node server.js
```

デフォルトでは、サーバーはポート25565で起動します。

## 設定

`config.json`ファイルでサーバーの設定を変更できます：

```json
{
  "port": 25565,
  "host": "0.0.0.0",
  "motd": "Minecraft Protocol Server",
  "maxPlayers": 20
}
```

## ライセンス

MIT