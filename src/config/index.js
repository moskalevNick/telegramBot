const getConfig = require('dotenv').config;

const config = getConfig().parsed;

module.exports = {
  dbUrl: DB_URL,
  tgApiKey: TG_API_KEY,
  roles: {
    visitor: 'visitor',
    teacher: 'teacher',
    student: 'student',
  },
};
