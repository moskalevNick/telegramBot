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

const server = http.createServer((req, res) => {});

server.listen(process.env.PORT || 3000, () => {
  console.log('Listening on port 3000');
});
