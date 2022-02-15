const bot = require('../services/bot/index');

const setCommands = () => {
  bot.setMyCommands([
    { command: '/start', description: 'Старт' },
    {
      command: '/freelesson',
      description: 'Бесплатный пробный урок',
    },
    { command: '/price', description: 'Стоимость обучения' },
    { command: '/requisites', description: 'Реквизиты для оплаты' },
    { command: '/students_menu', description: 'Меню ученика' },
    { command: '/teachers_menu', description: 'Меню учителя' },
    { command: '/admin_menu', description: 'Меню администратора' },
    { command: '/support', description: 'Техподдержка' },
  ]);
};

module.exports = setCommands;
