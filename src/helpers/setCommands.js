const bot = require('../services/bot/index');

const setCommands = () => {
    bot.setMyCommands([
        { command: '/start', description: 'Старт' },
        { command: '/teachers_menu', description: 'Меню учителя' },
        { command: '/students_menu', description: 'Меню ученика' },
        { command: '/price', description: 'Стоимость обучения' },
        { command: '/requisites', description: 'Реквизиты для оплаты' },
        { command: '/support', description: 'Техподдержка' },
    ]);
}

module.exports = setCommands;