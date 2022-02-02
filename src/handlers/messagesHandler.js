const {studentOptions, teacherOptions, teachers, supportOptions} = require('../options/index');
const {roles} = require('../config');
const getRole = require('./rolesHandler');
const bot = require('../services/bot/index');

const messagesHandler = async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    const role = await getRole(msg);

    if (text === '/teachers_menu' && role === roles.teacher) {
      return bot.sendMessage(chatId, 'Выберите опцию учителя:', teacherOptions);
    } else if (text === '/teachers_menu') {
      return bot.sendMessage(chatId, 'у вас недостаточно прав');
    }

    if (text === '/students_menu' && role === roles.student) {
      return bot.sendMessage(chatId, 'Выберите опцию учителя:', studentOptions);
    } else if (text === '/students_menu') {
      return bot.sendMessage(chatId, 'у вас недостаточно прав');
    }

    if (text === '/start') {
      return bot.sendMessage(chatId, `Добро пожаловать ${msg.from.first_name} ${msg.from.last_name ? msg.from.last_name : ''} выберите из опций что хотите узнать`);
    }

    if (text === '/price') {
      return bot.sendMessage(chatId, 'Выберите преподавателя:', teachers);
    }

    if (text === '/requisites') {
      return bot.sendMessage(chatId, `ИНДИВИДУАЛЬНЫЙ ПРЕДПРИНИМАТЕЛЬ \nМОСКАЛЁВ НИКОЛАЙ ВЛАДИМИРОВИЧ \nАдрес:РБ, Г. МОГИЛЕВ, УЛ. АЛЕКСЕЯ ПЫСИНА, Д. 7 ОФ. 68 \nУНП: 791302160 \nТекущий (расчетный) \n№ BY68ALFA30132B47710010270000 в BYN \nв ЗАО "Альфа-Банк" \nБИК: ALFABY2X`);
    }

    if (text === '/support') {
      return bot.sendMessage(chatId, 'Мы ответим быстро', supportOptions);
    }
}

module.exports = messagesHandler;