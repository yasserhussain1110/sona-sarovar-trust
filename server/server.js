require('./config/config');
const express = require('express');
const app = express();

const port = process.env.PORT;

require('./tools/setup-dev')(app);

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
