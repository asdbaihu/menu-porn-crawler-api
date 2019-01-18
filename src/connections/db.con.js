const Sequelize = require('sequelize')
  , { db } = require('../environment');

class DbConnection {

  constructor() {
    this.instance = new Sequelize(db.schema, db.user, db.password, {
      operatorsAliases: false, 
      dialect: 'mysql',
      logging: false,
      host: db.host,
      port: db.port
    });
  }

  testConnection() {
    return this.db.authenticate();
  }
}

module.exports = new DbConnection();
