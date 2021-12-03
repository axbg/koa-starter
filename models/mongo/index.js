const {DB_URI} = require('../../properties');

const db = require('./db');
const UserModel = require('./user')(db);

const connectDatabase = () => {
  db.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
};

module.exports = {
  connectDatabase,
  UserModel,
};
