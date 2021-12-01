const db = require('./db');

const UserModel = require('./user')(db);

const connect = () => {
  db.sync();
};

module.exports = {
  connect,
  UserModel,
};
