const bot = require('../services/bot/index');

const setCommands = () => {
  bot.setMyCommands([
    { command: '/start', description: 'Старт' },
    {
      command: '/freelesson',
      description: 'Записаться на бесплатный пробный урок',
    },
    { command: '/price', description: 'Стоимость обучения' },
    { command: '/requisites', description: 'Реквизиты для оплаты' },
    { command: '/teachers_menu', description: 'Меню учителя' },
    { command: '/students_menu', description: 'Меню ученика' },
    { command: '/support', description: 'Техподдержка' },
  ]);
};

module.exports = setCommands;
