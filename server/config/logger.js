const winston = require('winston');
require('winston-daily-rotate-file');

const CommonLogOptions = {
  json: false,
  colorize: true,
  timestamp: true,
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug'
};

const DailyLogOptions = Object.assign({}, CommonLogOptions, {
  filename: "logs/log",
  datePattern: 'yyyy-MM-dd.',
  prepend: true
});

const TestLogOptions = Object.assign({}, CommonLogOptions, {
  filename: "logs/test.log",
  datePattern: 'yyyy-MM-dd.',
  prepend: true
});

const dailyLogTransport = new (winston.transports.DailyRotateFile)(DailyLogOptions);
const testLogTransport = new (winston.transports.DailyRotateFile)(TestLogOptions);
const consoleTransport = new (winston.transports.Console)(CommonLogOptions);

const readyLogger = () => (
  process.env.NODE_ENV !== 'test' ?
    new (winston.Logger)({
      transports: [
        consoleTransport,
        dailyLogTransport
      ]
    })
    :
    new (winston.Logger)({
      transports: [
        testLogTransport
      ]
    }));

module.exports = readyLogger();
