
const bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser');

module.exports = app => {
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.text({ type: 'text/html' }));
  app.use(bodyParser.urlencoded({ extended: true }));
};
