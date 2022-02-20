const mongoose = require('mongoose');

const config = require('../config');

const setDbConnection = async () => {
  try {
    mongoose.connect(config.dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = setDbConnection;
