const { Schema, model } = require('mongoose');

const VistorSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String },
  username: { type: String },
  is_bot: { type: Boolean, required: true },
  chatId: { type: Number, required: true },
  lastEntrance: { type: String, required: true },
  numberOfEntries: { type: Number, required: true },
});

module.exports = model('Visitor', VistorSchema);
