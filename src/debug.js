const { mode } = require('./environment');

module.exports = {
  log: console.log,
  get http() { 
    return mode === 'develop' ? console.log : _ => {}
  }
};
