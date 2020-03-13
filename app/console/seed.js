const user = require('../models/user');
const systemSetting = require('../models/system-settings');

async function createUser(username, password) {
    if (await user.count({
        where: {
            username: username
        }
    }) === 0) {
        await user.create({username: username, password: password}).then(response => {
            console.log('created user ' + response.username);
        });
    } else {
        console.log('user ' + username + ' already created');
    }
}

async function setSettings(key, value) {
    if (await systemSetting.count({
        where: {
            key: key
        }
    }) === 0) {
        await systemSetting.create({key: key, value: value}).then(response => {
            console.log('set settings ' + response.key + '=>' + response.value);
        });
    } else {
        console.log('settings ' + key + ' already set');
    }
}

createUser('admin', 'admin');

setSettings('company', 'WITO Technology Sdn. Bhd.');
