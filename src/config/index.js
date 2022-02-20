require('dotenv').config;
const port = process.env.PORT || 3000;
module.exports = {
  dbUrl: process.env.DB_URL || '',
  tgApiKey: process.env.TG_API_KEY || '',
  roles: {
    visitor: 'visitor',
    teacher: 'teacher',
    student: 'student',
  },
};
