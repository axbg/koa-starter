const UserModelSchema = (db) => {
  return db.model('user', db.Schema({
    email: String,
    firstname: String,
    lastname: String,
    picture: String,
  }));
};

module.exports = UserModelSchema;
