const Student = require('../models/student-model');
const Teacher = require('../models/teacher-model');
const Visitor = require('../models/vistor-model');


const {createUser, updateLastEntranceById} = require('../services/user/index');

const getRole = async (msg) => {
    const teacher = await Teacher.findOne({ chatId: msg.chat.id });
    const student = await Student.findOne({ chatId: msg.chat.id });
    const visitor = await Visitor.findOne({ chatId: msg.chat.id });

    if (teacher) {
      return 'teacher'
    }

    if (student) {
      return 'student'
    }

    if (visitor) {
      await updateLastEntranceById(visitor._id, msg.date);

      return 'visitor'
    }

    await createUser({
      first_name: msg.from.first_name,
      last_name: msg.from.last_name,
      username: msg.from.username,
      is_bot: msg.from.is_bot,
      chatId: msg.from.id,
      lastEntrance: new Date(msg.date * 1000).toString(),
      numberOfEntries: 1,
    })

    return 'visitor'
};

module.exports = getRole;