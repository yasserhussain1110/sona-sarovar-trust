require('./config/config');
require('./db/mongoose');

const express = require('express');
const app = express();

const port = process.env.PORT;

require('./tools/setup-dev')(app);
require('./routes/adminRoutes')(app);

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
