const Vec3 = require('vec3');

class Protocol {
  constructor(server) {
    this.server = server;
    this.players = new Map();
    this.entityId = 0;
  }

  /**
   * プレイヤーのログイン処理
   * @param {object} client - クライアント接続オブジェクト
   */
  handlePlayerLogin(client) {
    // プレイヤーIDを割り当て
    client.id = this.entityId++;
    
    // プレイヤーをマップに追加
    this.players.set(client.id, {
      client: client,
      username: client.username,
      position: new Vec3(0, 70, 0),
      pitch: 0,
      yaw: 0
    });
    
    // 初期パケットを送信
    this._sendInitialPackets(client);
    
    // チャットハンドラを設定
    client.on('chat', (data) => {
      this._handleChat(client, data.message);
    });
    
    // 他のプレイヤーに新規プレイヤーを通知
    this._broadcastPlayerJoin(client);
  }
  
  /**
   * プレイヤー切断処理
   * @param {object} client - クライアント接続オブジェクト
   */
  handlePlayerDisconnect(client) {
    this.players.delete(client.id);
    this._broadcastPlayerLeave(client);
  }
  
  /**
   * 初期パケットの送信
   * @param {object} client - クライアント接続オブジェクト
   * @private
   */
  _sendInitialPackets(client) {
    // ゲームモード設定
    client.write('login', {
      entityId: client.id,
      isHardcore: false,
      gameMode: 0,
      previousGameMode: 255,
      worldNames: ['minecraft:overworld'],
      dimensionCodec: { type: 'compound', name: '', value: {} },
      dimension: { type: 'string', value: 'minecraft:overworld' },
      worldName: 'minecraft:overworld',
      hashedSeed: [0, 0],
      maxPlayers: this.server.maxPlayers,
      viewDistance: 10,
      reducedDebugInfo: false,
      enableRespawnScreen: true,
      isDebug: false,
      isFlat: false
    });
    
    // プレイヤー位置設定
    client.write('position', {
      x: 0,
      y: 70,
      z: 0,
      yaw: 0,
      pitch: 0,
      flags: 0,
      teleportId: 0
    });
  }
  
  /**
   * チャットメッセージ処理
   * @param {object} client - クライアント接続オブジェクト
   * @param {string} message - チャットメッセージ
   * @private
   */
  _handleChat(client, message) {
    // 全プレイヤーにチャットを送信
    this._broadcastMessage(`<${client.username}> ${message}`);
  }
  
  /**
   * メッセージをブロードキャスト
   * @param {string} message - ブロードキャストするメッセージ
   * @private
   */
  _broadcastMessage(message) {
    const messagePacket = {
      message: JSON.stringify({ text: message }),
      position: 0,
      sender: '00000000-0000-0000-0000-000000000000'
    };
    
    for (const [_, player] of this.players) {
      player.client.write('chat', messagePacket);
    }
  }
  
  /**
   * プレイヤー参加をブロードキャスト
   * @param {object} client - 参加したクライアント
   * @private
   */
  _broadcastPlayerJoin(client) {
    this._broadcastMessage(`§e${client.username} joined the game`);
  }
  
  /**
   * プレイヤー退出をブロードキャスト
   * @param {object} client - 退出したクライアント
   * @private
   */
  _broadcastPlayerLeave(client) {
    this._broadcastMessage(`§e${client.username} left the game`);
  }
}

module.exports = Protocol;