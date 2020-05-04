const config = require('../config');
const db = require('./db');
const UserModelSchema = require('./user');

const UserModel = UserModelSchema(db);

const connect = () => {
    db.connect(config.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
}

module.exports = {
    connect,
    UserModel
}