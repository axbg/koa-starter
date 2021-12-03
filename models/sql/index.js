const db = require('./db');

const UserModel = require('./user')(db);

const connectDatabase = () => {
  db.sync();
};

module.exports = {
  connectDatabase,
  UserModel,
};
