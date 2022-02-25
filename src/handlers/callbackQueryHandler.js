const {
  teacherOptions,
  packsNative,
  packsRussian,
  teachers,
  teacherStudentOptions,
  gradeLesson,
  sendPhoneOptions,
  requestFreeLessonOnly,
  removeKeyboard,
  formOfHomeWork,
} = require('../options/index');
const bot = require('../services/bot');
const messagesHandler = require('./messagesHandler');
const { getTeacherById, getStudentById } = require('../services/user');

const chatIdNikolay = 108758719;
const chatIdAlesya = 139989683;

const callbackQueryHandler = async (msg) => {
  const data = msg.data;
  const chatId = msg.message.chat.id;
  /* 
  const isStudentForTeacher = data.split('-')[0] === 'studentForTeacher';
  const isRequestEndLesson = data.split('-')[0] === 'requestEndLesson';
  const isSendHomeWork = data.split('-')[0] === 'sendHomeWork';
  const isPictureHW = data.split('-')[0] === 'pictureHW';
  const isDocumentHW = data.split('-')[0] === 'documentHW';
  const isTextHW = data.split('-')[0] === 'textHW';

 if (isPictureHW) {
    const currentStudentChatId = data.split('-')[1];
    await bot.sendMessage(
      chatId,
      'следующий документ будет отправлен вашему студенту',
      gradeLesson
    );
  } 

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
      bot.sendMessage(chatIdNikolay, `hw ${msg.document}`);
      console.log('document', msg);
      bot.removeAllListeners('message');
      start();
    });

      bot.on('photo', (msg) => {
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
         bot.sendMessage(chatIdNikolay, 'ваше домашнее задание: ', )
        bot.removeAllListeners('message');
        start();
      }
    }); 
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
   */
  switch (data) {
    case 'teacherName': {
      const student = await getStudentById(msg.from.id);
      const currentTeacher = await getTeacherById(student.teacherId);
      return bot.sendMessage(
        chatId,
        `вашего преподавателя зовут ${currentTeacher.name}`
      );
    }

    case 'lessonsLeft': {
      const student = await getStudentById(msg.from.id);
      return bot.sendMessage(
        chatId,
        `у вас осталось ${student.lessonsLeft} уроков`
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
            chatIdAlesya,
            `Ученик ${msg.from.first_name} ${
              msg.from.last_name ? msg.from.last_name : ''
            } написал вам: \n ${msg.text}`
          );
          bot.sendMessage(
            chatId,
            'ваше сообщение успешно отправлено, скоро я вам пришлю ответ'
          );
          bot.removeAllListeners('message');
          return bot.on('message', messagesHandler);
        }
        return;
      });
      return;
    }

    case 'moralSupport': {
      return bot.sendMessage(chatId, `все будет хорошо!`);
    }

    case 'communicationRequest': {
      bot.sendMessage(
        chatIdAlesya,
        `Пользователь ${msg.from.first_name} ${
          msg.from.last_name ? msg.from.last_name : ''
        } (никнейм: ${msg.from.username}) просит помощи`
      );
      bot.removeAllListeners('message');

      bot.sendMessage(chatId, 'мы скоро свяжемся с вами');
      bot.on('message', messagesHandler);
      return;
    }

    case 'textFreeLesson': {
      return bot.sendMessage(
        chatId,
        `Пробный урок проводится в режиме онлайн и длится не более 30 минут. Он включает в  себя знакомство со школой, определение текущего уровня владения языком посредством беседы, подбор программы, рекомендации по дальнейшему обучению и обсуждение организационных вопросов.`,
        requestFreeLessonOnly
      );
    }

    case 'requestFreeLesson': {
      bot.sendMessage(
        chatIdAlesya,
        `Пользователь ${msg.from.first_name} ${
          msg.from.last_name ? msg.from.last_name : ''
        } (никнейм: ${msg.from.username}) хочет пробный урок`
      );
      bot.sendMessage(
        chatId,
        `Ваша заявка сформирована, с вами свяжутся, для ускорения процесса можете оставить номер телефона, по которому можно связаться`,
        sendPhoneOptions
      );

      bot.on('message', (msg) => {
        bot.sendMessage(
          chatIdAlesya,
          `Пользователь ${msg.contact.first_name} написал вам телефон для связи: +${msg.contact.phone_number}`
        );

        bot.removeAllListeners('message');

        bot.sendMessage(
          chatId,
          'спасибо, мы скоро свяжемся с вами',
          removeKeyboard
        );
        bot.on('message', messagesHandler);
        return;
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
        ` ${msg.from.first_name}, выберите из опций что хотите узнать`
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
      return bot.sendPhoto(
        chatId,
        'https://i.ibb.co/9nSLSYJ/individual-Russian.jpg'
      );
    }

    case 'pairsRussian': {
      return bot.sendPhoto(
        chatId,
        'https://i.ibb.co/fC3T7BR/pairs-Russian.jpg'
      );
    }

    case 'groupsRussian': {
      return bot.sendPhoto(
        chatId,
        'https://i.ibb.co/PZxxX77/group-Russian.jpg'
      );
    }

    case 'individualNative': {
      return bot.sendPhoto(
        chatId,
        'https://i.ibb.co/VNb53PY/individual-Native.jpg'
      );
    }

    case 'pairsNative': {
      return bot.sendPhoto(chatId, 'https://i.ibb.co/vq7x86B/pairs-Native.jpg');
    }

    default: {
      return;
    }
  }
};

module.exports = callbackQueryHandler;
