const user = require('../models/user');
const systemSetting = require('../models/system-settings');

user.sync();
systemSetting.sync();
