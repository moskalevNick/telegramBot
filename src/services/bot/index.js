const TelegramApi = require('node-telegram-bot-api');

const config = require('../../config');

const bot = new TelegramApi(config.tgApiKey, {
  polling: true,
});

module.exports = bot;
