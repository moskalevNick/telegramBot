const TelegramApi = require('node-telegram-bot-api');
const {
  teacherOptions,
  packsNative,
  packsRussian,
  teachers,
  supportOptions,
} = require('./options');

const token = '5152205505:AAE4wU2v4Dw3w0BEQqDoQrpLr13-KgJKWzE';

const bot = new TelegramApi(token, { polling: true });

const chatIdAlesya = 139989683;
const chatIdNikolay = 108758719;

bot.setMyCommands([
  { command: '/teacher', description: 'Мой преподаватель' },
  { command: '/price', description: 'Стоимость обучения' },
  { command: '/requisites', description: 'Реквизиты для оплаты' },
  { command: '/support', description: 'Техподдержка' },
]);

const messageForTeacher = (chatId) => {
  bot.on('message', async (msg) => {
    await bot.sendMessage(
      chatIdNikolay,
      `Пользователь ${msg.from.first_name} ${
        msg.from.last_name ? msg.from.last_name : ''
      } написал вам: \n ${msg.text}`
    );
    return bot.sendMessage(
      chatId,
      'ваше сообщение успешно отправлено, скоро я вам пришлю ответ'
    );
  });
};

const start = () => {
  bot.on('message', async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === '/start') {
      return bot.sendMessage(
        chatId,
        `Добро пожаловать ${msg.from.first_name} ${
          msg.from.last_name ? msg.from.last_name : ''
        } выберите из опций что хотите узнать`
      );
    }

    if (text === '/teacher') {
      return bot.sendMessage(
        chatId,
        `Какая информация вас интересует`,
        teacherOptions
      );
    }

    if (text === '/price') {
      return bot.sendMessage(chatId, 'Выберите преподавателя', teachers);
    }

    if (text === '/requisites') {
      return bot.sendMessage(
        chatId,
        `ИНДИВИДУАЛЬНЫЙ ПРЕДПРИНИМАТЕЛЬ \nМОСКАЛЁВ НИКОЛАЙ ВЛАДИМИРОВИЧ \nАдрес:РБ, Г. МОГИЛЕВ, УЛ. АЛЕКСЕЯ ПЫСИНА, Д. 7 ОФ. 68 \nУНП: 791302160 \nТекущий (расчетный) \n№ BY68ALFA30132B47710010270000 в BYN \nв ЗАО "Альфа-Банк" \nБИК: ALFABY2X`
      );
    }

    if (text === '/support') {
      return bot.sendMessage(chatId, 'Мы ответим быстро', supportOptions);
    }
  });
};

start();

bot.on('callback_query', async (msg) => {
  const data = msg.data;
  const chatId = msg.message.chat.id;
  switch (data) {
    case 'teacherName': {
      return bot.sendMessage(chatId, `вашего преподавателя зовут Пупа Луповна`);
    }
    case 'lessonsLeft': {
      return bot.sendMessage(chatId, `у вас осталось 7 уроков`);
    }

    case 'moralSupport': {
      return bot.sendMessage(chatId, `все буде добра!`);
    }

    case 'communicationRequest': {
      return bot.sendMessage(
        chatIdNikolay,
        `Пользователь ${msg.from.first_name} ${
          msg.from.last_name ? msg.from.last_name : ''
        } (никнейм: ${msg.from.username}) просит помощи`
      );
    }

    case 'messageForTeacher': {
      bot.sendMessage(
        chatId,
        `следующее сообщение которое вы мне отправите будет автоматически переадресовано вашему преподавателю`
      );
      messageForTeacher(chatId);
      return;
    }

    case 'teachers': {
      return bot.sendMessage(chatId, 'Выберите преподавателя', teachers);
    }

    case 'nativeSpeaker': {
      return bot.sendMessage(chatId, `Выберите пакет`, packsNative);
    }
    case 'russianSpeaker': {
      return bot.sendMessage(chatId, `Выберите пакет`, packsRussian);
    }

    case 'individualRussian': {
      return bot.sendMessage(
        chatId,
        `Индивидуальная форма \nРусскоязычный преподаватель: \nПакет 4: \n50 мин – 109.99 руб. цена за урок 27.50 \n80 мин – 169.99 руб. цена за урок 42.50 \nПакет 8: \n50 мин – 214.99 руб. цена за урок 26.90 \n80 мин –325.99 руб. цена за урок 40.75 \nПакет 16:\n50 мин –399.99 руб. цена за урок 24.99\n80 мин –595.99 руб. цена за урок 37.25\nПакет 24:\n50 мин –559.99 руб. цена за урок 23.30\n80 мин –839.99 руб. цена за урок 34.99`,
        packsRussian
      );
    }
    case 'pairsRussian': {
      return bot.sendMessage(
        chatId,
        `Парная форма\nРусскоязычный преподаватель:\nПакет 4:\n50 мин – 109.99 руб. цена за урок 27.50\n80 мин – 169.99 руб. цена за урок 42.50\nПакет 8:\n50 мин – 214.99 руб. цена за урок 26.90\n80 мин –325.99 руб. цена за урок 40.75\nПакет 16:\n50 мин –399.99 руб. цена за урок 24.998\n80 мин –595.99 руб. цена за урок 37.25\nПакет 24:\n50 мин –559.99 руб. цена за урок 23.30\n80 мин –839.99 руб. цена за урок 34.99`,
        packsRussian
      );
    }
    case 'groupsRussian': {
      return bot.sendMessage(
        chatId,
        `Групповая форма\nРусскоязычный преподаватель:\nПакет 4:\n50 мин – 109.99 руб. цена за урок 27.50\n80 мин – 169.99 руб. цена за урок 42.50\nПакет 8:\n50 мин – 214.99 руб. цена за урок 26.90\n80 мин –325.99 руб. цена за урок 40.75\nПакет 16:\n50 мин –399.99 руб. цена за урок 24.99\n80 мин –595.99 руб. цена за урок 37.25\nПакет 24:\n50 мин –559.99 руб. цена за урок 23.30\n80 мин –839.99 руб. цена за урок 34.99`,
        packsRussian
      );
    }
    case 'individualNative': {
      return bot.sendMessage(
        chatId,
        `Индивидуальная форма\nНоситель языка:\nПакет 4:\n50 мин – 169.99 руб. цена за урок 42.50\n80 мин –269.99 руб. цена за урок 67.50\nПакет 8:\n50 мин – 325.99 руб. цена за урок 40.75\n80 мин –519.99 руб. цена за урок 64.99\nПакет 16:\n50 мин – 595.99 руб. цена за урок 37.25\n80 мин –955.99 руб. цена за урок 59.75\nПакет 24:\n50 мин –839.99 руб. цена за урок 34.99\n80 мин –1345.99 руб. цена за урок 56.10`,
        packsNative
      );
    }
    case 'pairsNative': {
      return bot.sendMessage(
        chatId,
        `Парная форма\nНоситель языка:\nПакет 4:\n60 мин –109.99 руб. цена за урок 27.50\n80 мин –149.99 руб. цена за урок 36.50\nПакет 8:\n60 мин –214.99 руб. цена за урок 26.90\n80 мин –285.99 руб. цена за урок 35.75\nПакет 16:\n60 мин –405.99 руб. цена за урок 25.40\n80 мин –539.99 руб. цена за урок 33.75\nПакет 24:\n60 мин –559.99 руб. цена за урок 23.30\n120 мин –745.99 руб. цена за урок 31.10`,
        packsNative
      );
    }
  }
});
