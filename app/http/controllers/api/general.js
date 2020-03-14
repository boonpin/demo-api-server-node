const systemSettings = require('../../../models/system-settings');
const product = require('../../../models/product');

exports.info = async (req, res, next) => {
    try {
        const data = await systemSettings.findAll({attributes: ['key', 'value']});
        res.send(data);
    } catch (err) {
        next(err);
    }
};

exports.products = async (req, res, next) => {
    try {
        const d = await product.find({}).exec();
        console.log(d);
        res.send(d);
    } catch (err) {
        next(err);
    }
};
