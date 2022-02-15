const { Schema, model } = require('mongoose');

const TeacherSchema = new Schema({
  chatId: { type: Number, required: true },
  name: { type: String, required: true },
  students: [{ chatId: Number, name: String }],
  birthday: { type: Date },
  email: { type: String },
  phone: { type: String },
});

module.exports = model('Teacher', TeacherSchema);
