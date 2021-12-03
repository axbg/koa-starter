const {DB_URI} = require('../properties');
module.exports = DB_URI.includes('mongodb://') ? require('./mongo') : require('./sql');
