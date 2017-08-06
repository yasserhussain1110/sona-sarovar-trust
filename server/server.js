require('./config/config');
require('./db/mongoose');

const port = process.env.PORT;

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {RESOURCES_DIR} = process.env;

app.use(bodyParser.json());
app.use(express.static('./' + RESOURCES_DIR));

require('./routes/adminRoutes')(app);
require('./routes/appStateRoutes')(app);
require('./routes/homePageRoutes')(app);
require('./routes/projectRoutes')(app);
require('./routes/teammemberRoutes')(app);

/* Set up development server if required */
if (process.env.NODE_ENV === "development") {
  console.log("Running In Development");
  require('./tools/setup-dev')(app);
}
/* Or serve static assets in production */
else if (process.env.NODE_ENV === "production") {
  console.log("Running In Production");
  app.use(express.static('./dist'));
}

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});

module.exports = app;
