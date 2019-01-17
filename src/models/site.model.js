const Sequelize = require('sequelize');

class SiteModel {
    constructor(site){}

    static defineEntityStructure() {
        return {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false
            },
            url: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false,
            }
        };
    } 
}
module.exports = SiteModel;
