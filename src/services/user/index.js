const Visitor = require('../../models/vistor-model');
const Teacher = require('../../models/teacher-model');
const Student = require('../../models/student-model');

const createUser = async (data) => {
  const newVisitor = new Visitor(data);

  return await newVisitor.save();
};

const updateLastEntranceById = async (id, date) => {
  return await Visitor.findByIdAndUpdate(id, {
    $set: { lastEntrance: new Date(date * 1000).toString() },
    $inc: { numberOfEntries: 1 },
  });
};

const getTeacherById = async (id) => {
  return await Teacher.findOne({ chatId: id });
};
const getStudentById = async (id) => {
  return await Student.findOne({ chatId: id });
};

module.exports = {
  createUser,
  updateLastEntranceById,
  getTeacherById,
  getStudentById,
};
