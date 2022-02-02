const { Schema, model } = require('mongoose');

const StudentSchema = new Schema({
  chatId: { type: Number, required: true },
  name: { type: String, required: true },
  lessonsLeft: { type: Number, required: true },
});

module.exports = model('Student', StudentSchema);
