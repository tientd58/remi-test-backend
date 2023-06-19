const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}`)
});

console.log('config: ', process.env.PORT);

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'localhost',
  MONGODB_URI: process.env.NODE_ENV === 'test' ? 'mongodb://localhost:27017/remi-unit-test' : process.env.MONGODB_URI ,
  PORT: process.env.PORT || 8080,
  REDIS_HOST: process.env.REDIS_HOST || '127.0.0.1',
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  QUEUE_NAME: 'notification_jobs',
};
