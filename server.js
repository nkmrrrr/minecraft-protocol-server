const mc = require('minecraft-protocol');
const config = require('./config.json');
const Protocol = require('./lib/protocol');
const { logger } = require('./lib/utils');

// サーバーインスタンスの作成
const server = mc.createServer({
  'online-mode': false,
  encryption: false,
  host: config.host,
  port: config.port,
  version: '1.19.4',
  motd: config.motd,
  maxPlayers: config.maxPlayers
});

// プロトコルハンドラーのインスタンス
const protocol = new Protocol(server);

// サーバー起動時のイベント
server.on('listening', () => {
  logger.info(`Minecraft Protocol Server running on ${config.host}:${config.port}`);
});

// クライアント接続時のイベント
server.on('login', (client) => {
  logger.info(`New player connected: ${client.username}`);
  
  // プロトコルに接続を通知
  protocol.handlePlayerLogin(client);
  
  // クライアント切断時のイベント
  client.on('end', () => {
    logger.info(`Player disconnected: ${client.username}`);
    protocol.handlePlayerDisconnect(client);
  });
  
  // エラー発生時のイベント
  client.on('error', (error) => {
    logger.error(`Error for player ${client.username}: ${error.message}`);
  });
});

// サーバー全体のエラーハンドリング
server.on('error', (error) => {
  logger.error(`Server error: ${error.message}`);
});