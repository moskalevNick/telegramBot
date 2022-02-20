const getConfig = require('dotenv').config;

const config = getConfig().parsed;

module.exports = {
  dbUrl: process.env.DB_URL || config.DB_URL,
  tgApiKey: process.env.TG_API_KEY || config.TG_API_KEY,
  roles: {
    visitor: 'visitor',
    teacher: 'teacher',
    student: 'student',
  },
};
