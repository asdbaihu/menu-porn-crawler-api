const Sequelize = require('sequelize');

module.exports = {
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    unique: true,
    autoIncrement: true,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('NOW()')
  },
  updatedAt: {
    type: 'DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW()'
  }
}
