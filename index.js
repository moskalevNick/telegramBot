const bot = require('./src/services/bot/index');
const callbackQueryHandler = require('./src/handlers/callbackQueryHandler');
const messagesHandler = require('./src/handlers/messagesHandler');
const setCommands = require('./src/helpers/setCommands');
const setDbConnection = require('./src/database/index');

const start = async () => {
  await setDbConnection();
  setCommands();
  bot.on('message', messagesHandler);
  bot.on('callback_query', callbackQueryHandler);
};

start();