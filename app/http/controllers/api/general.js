const systemSettings = require('../../../models/system-settings');

exports.info = async (req, res, next) => {
    const data = await systemSettings.findAll({attributes: ['key', 'value']});
    res.send(await data.map(rs => {
        return rs.value;
    }));
};
