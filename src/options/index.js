const {
  back,
  lessonsLeft,
  teacherName,
  teachers,
  messageForTeacher,
  listOfStudents,
  russianSpeaker,
  nativeSpeaker,
  individualRussian,
  pairsRussian,
  groupsRussian,
  moralSupport,
  communicationRequest,
  individualNative,
  pairsNative,
  textFreeLesson,
  requestFreeLesson,
} = require('../text/callbackDataText');

const studentOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        {
          text: 'Как обращаться к моему преподавателю',
          callback_data: teacherName,
        },
      ],
      [
        {
          text: 'Сколько занятий осталось',
          callback_data: lessonsLeft,
        },
      ],
      [
        {
          text: 'Написать сообщение преподавателю',
          callback_data: messageForTeacher,
        },
      ],
      [
        {
          text: 'Вернуться',
          callback_data: back,
        },
      ],
    ],
  }),
};

const teacherOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        {
          text: 'Список моих студентов',
          callback_data: listOfStudents,
        },
      ],
      [
        {
          text: 'Вернуться',
          callback_data: back,
        },
      ],
    ],
  }),
};

const teachersOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        {
          text: 'Русскоговорящий преподаватель',
          callback_data: russianSpeaker,
        },
      ],
      [
        {
          text: 'Носитель языка',
          callback_data: nativeSpeaker,
        },
      ],
    ],
  }),
};

const packsRussian = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        {
          text: 'Индивидуальная',
          callback_data: individualRussian,
        },
      ],
      [
        {
          text: 'Парная',
          callback_data: pairsRussian,
        },
      ],
      [
        {
          text: 'Групповая',
          callback_data: groupsRussian,
        },
      ],
      [
        {
          text: 'Сменить преподавателя',
          callback_data: teachers,
        },
      ],
    ],
  }),
};

const packsNative = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        {
          text: 'Индивидуальная',
          callback_data: individualNative,
        },
      ],
      [
        {
          text: 'Парная',
          callback_data: pairsNative,
        },
      ],
      [
        {
          text: 'Сменить преподавателя',
          callback_data: teachers,
        },
      ],
    ],
  }),
};

const supportOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        {
          text: 'Поддержите морально',
          callback_data: moralSupport,
        },
      ],
      [
        {
          text: 'Свяжитесь со мной',
          callback_data: communicationRequest,
        },
      ],
    ],
  }),
};

const teacherStudentOptions = (chatId) => ({
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        {
          text: 'Урок проведен',
          callback_data: `requestEndLesson-${chatId}`,
        },
      ],
      [
        {
          text: 'Выслать домашнее задание',
          callback_data: `sendHomeWork-${chatId}`,
        },
      ],
      [
        {
          text: 'Запрос переноса урока',
          callback_data: `requestMoveLesson-${chatId}`,
        },
      ],
    ],
  }),
});

const freeLessonOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        {
          text: 'Что представляет собой пробный урок?',
          callback_data: textFreeLesson,
        },
      ],
      [
        {
          text: 'Записаться на пробный урок',
          callback_data: requestFreeLesson,
        },
      ],
    ],
  }),
};

const requestFreeLessonOnly = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        {
          text: 'Записаться на пробный урок',
          callback_data: requestFreeLesson,
        },
      ],
    ],
  }),
};

const sendPhoneOptions = {
  parse_mode: 'Markdown',
  reply_markup: {
    one_time_keyboard: true,
    keyboard: [
      [
        {
          text: 'Отправить мой номер телефона',
          request_contact: true,
        },
      ],
    ],
  },
};

/* const defaultOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        {
          text: 'Стоимость обучения',
          callback_data: teachers,
        },
      ],
      [
        {
          text: 'Реквизиты для оплаты',
          callback_data: requisites,
        },
      ],
      [
        {
          text: 'Техподдержка',
          callback_data: support,
        },
      ],
    ],
  }),
}; */

const gradeLesson = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        {
          text: '⭐',
          callback_data: `gradeLesson-1`,
        },
      ],
      [
        {
          text: '⭐⭐',
          callback_data: `gradeLesson-2`,
        },
      ],
      [
        {
          text: '⭐⭐⭐',
          callback_data: `gradeLesson-3`,
        },
      ],
      [
        {
          text: '⭐⭐⭐⭐',
          callback_data: `gradeLesson-4`,
        },
      ],
      [
        {
          text: '⭐⭐⭐⭐⭐',
          callback_data: `gradeLesson-5`,
        },
      ],
    ],
  }),
};

/* const formOfHomeWork = (currentStudentChatId) => ({
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        {
          text: 'Картинка/фото',
          callback_data: `pictureHW-${currentStudentChatId}`,
        },
      ],
      [
        {
          text: 'Документ',
          callback_data: `documentHW-${currentStudentChatId}`,
        },
      ],
      [
        {
          text: 'Текст',
          callback_data: `textHW-${currentStudentChatId}`,
        },
      ],
    ],
  }),
}); */

module.exports = {
  studentOptions,
  teacherOptions,
  teachers: teachersOptions,
  packsRussian,
  packsNative,
  supportOptions,
  teacherStudentOptions,
  gradeLesson,
  sendPhoneOptions,
  freeLessonOptions,
  requestFreeLessonOnly,
  /* 
  formOfHomeWork, */
};
