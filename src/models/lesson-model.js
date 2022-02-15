const { Schema, model } = require('mongoose');

const LessonSchema = new Schema({
  teacherChatId: { type: Number, required: true },
  studentChatId: { type: Number, required: true },
  dateOfLesson: { type: Date },
  teachersMark: { type: Number },
  teachersCoast: { type: Number, required: true },
  isAbsent: { type: Boolean, required: true },
});

module.exports = model('Lesson', LessonSchema);
