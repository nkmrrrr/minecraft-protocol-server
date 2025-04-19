/**
 * シンプルなロガーオブジェクト
 */
const logger = {
  /**
   * 情報ログ
   * @param {string} message - ログメッセージ
   */
  info: (message) => {
    console.log(`[INFO] ${message}`);
  },
  
  /**
   * 警告ログ
   * @param {string} message - 警告メッセージ
   */
  warn: (message) => {
    console.log(`[WARNING] ${message}`);
  },
  
  /**
   * エラーログ
   * @param {string} message - エラーメッセージ
   */
  error: (message) => {
    console.error(`[ERROR] ${message}`);
  },
  
  /**
   * デバッグログ
   * @param {string} message - デバッグメッセージ
   */
  debug: (message) => {
    if (process.env.DEBUG) {
      console.log(`[DEBUG] ${message}`);
    }
  }
};

/**
 * UUIDを生成する関数
 * @returns {string} UUID文字列
 */
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

module.exports = {
  logger,
  generateUUID
};