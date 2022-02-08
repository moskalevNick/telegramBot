const {
  teacherOptions,
  packsNative,
  packsRussian,
  teachers,
  teacherStudentOptions,
  gradeLesson,
  formOfHomeWork,
} = require('../options/index');
const bot = require('../services/bot');
const { getTeacherById } = require('../services/user');

const chatIdNikolay = 108758719;

const callbackQueryHandler = async (msg) => {
  const data = msg.data;
  const chatId = msg.message.chat.id;

  const isStudentForTeacher = data.split('-')[0] === 'studentForTeacher';
  const isRequestEndLesson = data.split('-')[0] === 'requestEndLesson';
  const isSendHomeWork = data.split('-')[0] === 'sendHomeWork';
  const isPictureHW = data.split('-')[0] === 'pictureHW';
  const isDocumentHW = data.split('-')[0] === 'documentHW';
  const isTextHW = data.split('-')[0] === 'textHW';

  /* if (isPictureHW) {
    const currentStudentChatId = data.split('-')[1];
    await bot.sendMessage(
      chatId,
      'следующий документ будет отправлен вашему студенту',
      gradeLesson
    );
  } */

  if (isRequestEndLesson) {
    const currentStudentChatId = data.split('-')[1];

    await bot.sendMessage(
      chatId,
      'Ваша заявка сформирована, оцените урок',
      gradeLesson
    );

    await bot.sendMessage(
      currentStudentChatId,
      'Если урок проведен, поставьте оценку вашему преподавателю: ',
      gradeLesson
    );

    return bot.sendMessage(chatId, 'спасибо за работу');
  }

  if (isSendHomeWork) {
    const currentStudentChatId = data.split('-')[1];
    bot.sendMessage(chatId, 'следующее сообщение будет доставлено ученику:');

    bot.on('message', (msg) => {
      //bot.sendMessage(chatIdNikolay, `hw ${msg.document}`);
      console.log('document', msg);
      //bot.removeAllListeners('message');
      //start();
    });

    /*  bot.on('photo', (msg) => {
      console.log('photo', msg);
    });

    bot.on('text', (msg) => {
      console.log('text', msg);
    });

    bot.on('voice', (msg) => {
      console.log('voice', msg);
    });

    bot.on('message', (msg) => {
      if (msg.text[0] !== '/') {
        console.log('hw: ', msg);
        // bot.sendMessage(chatIdNikolay, 'ваше домашнее задание: ', )
        bot.removeAllListeners('message');
        start();
      }
    }); */
    return;
  }

  if (isStudentForTeacher) {
    const currentStudentChatId = data.split('-')[1];
    return bot.sendMessage(
      chatId,
      `выберите действие:`,
      teacherStudentOptions(currentStudentChatId)
    );
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

      case 'gradeLesson-1': {
        return bot.sendMessage(
          chatIdNikolay,
          `${chatId}, урок окончен, оценка урока 1`
        );
      }
      case 'gradeLesson-2': {
        return bot.sendMessage(
          chatIdNikolay,
          `${chatId}, урок окончен, оценка урока 2`
        );
      }
      case 'gradeLesson-3': {
        return bot.sendMessage(
          chatIdNikolay,
          `${chatId}, урок окончен, оценка урока 3`
        );
      }
      case 'gradeLesson-4': {
        return bot.sendMessage(
          chatIdNikolay,
          `${chatId}, урок окончен, оценка урока 4`
        );
      }
      case 'gradeLesson-5': {
        return bot.sendMessage(
          chatIdNikolay,
          `${chatId}, урок окончен, оценка урока 5`
        );
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
        const teacher = await getTeacherById(msg.from.id);

        const arrayStudents = teacher.students.map((student) => [
          {
            text: `${student.name}`,
            callback_data: `studentForTeacher-${student.chatId}`,
          },
        ]);

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
};

module.exports = callbackQueryHandler;
