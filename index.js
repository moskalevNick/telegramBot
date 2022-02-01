const TelegramApi = require('node-telegram-bot-api');
const mongoose = require('mongoose');
require('dotenv').config();
const {
  studentOptions,
  teacherOptions,
  packsNative,
  packsRussian,
  teachers,
  supportOptions,
} = require('./options');

const token = '5152205505:AAE4wU2v4Dw3w0BEQqDoQrpLr13-KgJKWzE';

const bot = new TelegramApi(token, { polling: true });

const Student = require('./models/student-model');
const Teacher = require('./models/teacher-model');
const Visitor = require('./models/vistor-model');

const chatIdAlesya = 139989683;
const chatIdNikolay = 108758719;

bot.setMyCommands([
  { command: '/start', description: 'Старт' },
  { command: '/teachers_menu', description: 'Меню учителя' },
  { command: '/students_menu', description: 'Меню ученика' },
  { command: '/price', description: 'Стоимость обучения' },
  { command: '/requisites', description: 'Реквизиты для оплаты' },
  { command: '/support', description: 'Техподдержка' },
]);

let teacher;
let student;
let visitor;

const getRole = async (msg) => {
  try {
    mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (e) {
    console.log(e);
  }

  [teacher] = await Teacher.find({ chatId: msg.chat.id });
  [student] = await Student.find({ chatId: msg.chat.id });
  [visitor] = await Visitor.find({ chatId: msg.chat.id });

  if (!visitor && !student && !teacher) {
    const newVisitor = new Visitor({
      first_name: msg.from.first_name,
      last_name: msg.from.last_name,
      username: msg.from.username,
      is_bot: msg.from.is_bot,
      chatId: msg.from.id,
      lastEntrance: new Date(msg.date * 1000).toString(),
      numberOfEntries: 1,
    });
    await newVisitor.save();
  } else if (visitor && !student && !teacher) {
    await Visitor.findByIdAndUpdate(visitor._id, {
      $set: {
        lastEntrance: new Date(msg.date * 1000).toString(),
      },
      $inc: {
        numberOfEntries: 1,
      },
    });
  }
};

const start = () => {
  bot.on('message', async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    await getRole(msg);

    if (text === '/teachers_menu' && teacher) {
      return bot.sendMessage(chatId, 'Выберите опцию учителя:', teacherOptions);
    } else if (text === '/teachers_menu') {
      return bot.sendMessage(chatId, 'у вас недостаточно прав');
    }

    if (text === '/students_menu' && student) {
      return bot.sendMessage(chatId, 'Выберите опцию учителя:', studentOptions);
    } else if (text === '/students_menu') {
      return bot.sendMessage(chatId, 'у вас недостаточно прав');
    }

    if (text === '/start') {
      return bot.sendMessage(
        chatId,
        `Добро пожаловать ${msg.from.first_name} ${
          msg.from.last_name ? msg.from.last_name : ''
        } выберите из опций что хотите узнать`
      );
    }

    if (text === '/price') {
      return bot.sendMessage(chatId, 'Выберите преподавателя:', teachers);
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

  const isStudentForTeacher = data.split('-')[0] === 'studentForTeacher';

  if (isStudentForTeacher) {
    bot.removeAllListeners('callback_query');

    const currentStudentChatId = data.split('-')[1];

    bot.on('callback_query', async (msg) => {
      const data = msg.data;
      const chatId = msg.message.chat.id;
      console.log(data);
    });

    bot.sendMessage(chatId, `выберите действие:`, {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [
            {
              text: 'Урок проведен',
              callback_data: `requestEndLesson-${currentStudentChatId}`,
            },
          ],
          [
            {
              text: 'Выслать домашнее задание',
              callback_data: `sendHomeWork-${currentStudentChatId}`,
            },
          ],
          [
            {
              text: 'Запрос переноса урока',
              callback_data: `requestMoveLesson-${currentStudentChatId}`,
            },
          ],
        ],
      }),
    });
  } else {
    switch (data) {
      case 'teacherName': {
        return bot.sendMessage(
          chatId,
          `вашего преподавателя зовут Пупа Луповна`
        );
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

        bot.on('message', (msg) => {
          if (msg.text[0] !== '/') {
            bot.sendMessage(
              chatIdNikolay,
              `Пользователь ${msg.from.first_name} ${
                msg.from.last_name ? msg.from.last_name : ''
              } написал вам: \n ${msg.text}`
            );
            bot.sendMessage(
              chatId,
              'ваше сообщение успешно отправлено, скоро я вам пришлю ответ',
              teacherOptions
            );
            bot.removeAllListeners('message');
            start();
          }
        });
        return;
      }

      case 'back': {
        return bot.sendMessage(
          chatId,
          ` ${msg.from.first_name} ${
            msg.from.last_name ? msg.from.last_name : ''
          } выберите из опций что хотите узнать`
        );
      }

      case 'listOfStudents': {
        const arrayStudents = teacher.students.map((student) => {
          const studentString = [
            {
              text: `${student.name}`,
              callback_data: `studentForTeacher-${student.chatId}`,
            },
          ];
          return studentString;
        });

        return bot.sendMessage(chatId, 'Выберите ученика: ', {
          reply_markup: JSON.stringify({
            inline_keyboard: arrayStudents,
          }),
        });
      }

      case 'teachers': {
        return bot.sendMessage(chatId, 'Выберите преподавателя:', teachers);
      }

      case 'nativeSpeaker': {
        return bot.sendMessage(chatId, `Выберите пакет:`, packsNative);
      }
      case 'russianSpeaker': {
        return bot.sendMessage(chatId, `Выберите пакет:`, packsRussian);
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
      default: {
        // console.log(data);
        return;
      }
    }
  }
});
