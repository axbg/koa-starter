const properties = require('../../properties');

const db = require('./db');
const UserModel = require('./user')(db);

const connect = () => {
  db.connect(properties.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
};

module.exports = {
  connect,
  UserModel,
};
