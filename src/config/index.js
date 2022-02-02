const getConfig = require('dotenv').config;

const config = getConfig().parsed;

module.exports = {
  dbUrl: config.DB_URL,
  tgApiKey: config.TG_API_KEY,
  roles: {
    visitor: 'visitor',
    teacher: 'teacher',
    student: 'student',
  }
}