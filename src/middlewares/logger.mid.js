const chalk = require('chalk')
  , { http } = require('../utils/debug');

module.exports = (req, res, next) => {
  http(`[${chalk.white(new Date())}] "${chalk.blue(req.method)} ${chalk.blue(req.url)}" "${chalk.gray(req.headers['user-agent'])}"`);
  next();
};
