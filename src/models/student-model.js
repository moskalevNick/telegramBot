const { Schema, model } = require('mongoose');

const StudentSchema = new Schema({
  chatId: { type: Number, required: true },
  name: { type: String, required: true },
  teacherId: { type: Number, required: true },
  teachersCoast: { type: Number, required: true },
  lessonsLeft: { type: Number, required: true },
  birthday: { type: Date },
  email: { type: String },
  phone: { type: String },
});

module.exports = model('Student', StudentSchema);
