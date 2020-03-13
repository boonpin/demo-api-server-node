const uuid = require('uuid');
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const connection = require('../provider/database').rdbm;

const model = connection.define('user', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    is_disabled: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    contact: {
        type: Sequelize.STRING
    },
    refresh_token: {
        type: Sequelize.TEXT
    },
    refresh_token_expiry: {
        type: Sequelize.BIGINT
    }
}, {
    tableName: 'users',
    freezeTableName: true
});

model.beforeCreate((user, _) => {
    return user.id = uuid.v4();
});

model.beforeSave(async (user, _) => {
    const changed = user.changed();
    if (changed && changed.find(c => c === 'password')) {
        user.password = await bcrypt.hash(user.password, bcrypt.genSaltSync(12), null, (err, hash) => {
            // TODO: Logging
            console.error(err);
        });
    }
    return user;
});

module.exports = model;
