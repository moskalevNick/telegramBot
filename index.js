const bot = require('./src/services/bot/index');
const callbackQueryHandler = require('./src/handlers/callbackQueryHandler');
const messagesHandler = require('./src/handlers/messagesHandler');
const setCommands = require('./src/helpers/setCommands');
const setDbConnection = require('./src/database/index');

const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

const start = async () => {
  await setDbConnection();
  setCommands();
  bot.on('message', messagesHandler);
  bot.on('callback_query', callbackQueryHandler);

  app.use(express.json());
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello from the Bot API.' });
  });
  app.post(`/${process.env.TELEGRAM_TOKEN}`, (req, res) => {
    bot.processUpdate(req.body);
    res.status(200).json({ message: 'ok' });
  });
  app.listen(port, () => {
    console.log(`\n\nServer running on port ${port}.\n\n`);
  });
};

start();
