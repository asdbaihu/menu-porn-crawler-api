'use strict';
/*  
  Get version
 */
const { 
  name
  , version
} = require('../package.json');

/*  
  Get environment
 */
const {
  mode
  , host
  , port
} = require('./environment');

/*  
  Get dependencies
 */
const express   = require('express')
  , http        = require('http')
  , app         = express()

  , { log }     = require('./debug')
  , routes      = require('./routes')
  , parser      = require('./parser')
  , middlewares = require('./middlewares');


/**
 * @function start
 * 
 * @description
 * Set up the HTTP server to listen on the correct
 */
function start() {
  const logger = _ => log(`${name} start in ${mode} on http://${host}:${port}/ at ${version}.`);
  const server = http.createServer(app).listen(port, host, logger);
  middlewares(app);
  parser(app);
  routes(app); 

  return server;
}

module.exports = start();
