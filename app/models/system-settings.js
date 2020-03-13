const Sequelize = require('sequelize');
const connection = require('../provider/database').rdbm;

const model = connection.define('sys_settings', {
    key: {
        type: Sequelize.STRING,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false
    },
    value: {
        type: Sequelize.STRING
    }
}, {
    tableName: 'sys_settings',
    freezeTableName: true
});

module.exports = model;
