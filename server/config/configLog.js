const fs = require('fs');

if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs');
}

require('./logger');
