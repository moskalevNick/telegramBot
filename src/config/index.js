require('dotenv').config;

module.exports = {
  dbUrl: process.env.DB_URL || '',
  tgApiKey: process.env.TG_API_KEY || '',
  roles: {
    visitor: 'visitor',
    teacher: 'teacher',
    student: 'student',
  },
};
