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
    pairsNative
} = require('../text/callbackDataText');

const studentOptions = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{
            text: 'Как обращаться к моему преподавателю',
            callback_data: teacherName,
        }],
        [{ 
            text: 'Сколько занятий осталось', 
            callback_data: lessonsLeft 
        }],
        [{
            text: 'Написать сообщение преподавателю',
            callback_data: messageForTeacher,
        }],
        [{ 
            text: 'Вернуться', 
            callback_data: back 
        }],
      ],
    }),
};

const teacherOptions = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ 
            text: 'Список моих студентов', 
            callback_data: listOfStudents 
        }],
        [{ 
            text: 'Вернуться', 
            callback_data: back 
        }],
      ],
    }),
};

const teachersOptions = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{
            text: 'Русскоговорящий преподаватель',
            callback_data: russianSpeaker,
        }],
        [{
            text: 'Носитель языка',
            callback_data: nativeSpeaker,
        }],
      ],
    }),
};

const packsRussian = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{
            text: 'Индивидуальная',
            callback_data: individualRussian,
        }],
        [{ 
            text: 'Парная', 
            callback_data: pairsRussian 
        }],
        [{ 
            text: 'Групповая', 
            callback_data: groupsRussian 
        }],
        [{ 
            text: 'Сменить преподавателя', 
            callback_data: teachers 
        }],
      ],
    }),
};

const packsNative = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{
            text: 'Индивидуальная',
            callback_data: individualNative,
        }],
        [{ 
            text: 'Парная', 
            callback_data: pairsNative 
        }],
        [{ 
            text: 'Сменить преподавателя', 
            callback_data: teachers 
        }],
      ],
    }),
};

const supportOptions = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ 
            text: 'Поддержите морально', 
            callback_data: moralSupport 
        }],
        [{
            text: 'Свяжитесь со мной',
            callback_data: communicationRequest,
        }],
      ],
    }),
};

const studentLeasonOptions = (chatId) => ({
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{
            text: 'Урок проведен',
            callback_data: `requestEndLesson-${chatId}`,
        }],
        [{
            text: 'Выслать домашнее задание',
            callback_data: `sendHomeWork-${chatId}`,
        }],
        [{
            text: 'Запрос переноса урока',
            callback_data: `requestMoveLesson-${chatId}`,
        }],
      ],
    }),
})

module.exports = {
    studentOptions,
    teacherOptions,
    teachers: teachersOptions,
    packsRussian,
    packsNative,
    supportOptions,
    studentLeasonOptions
};
  