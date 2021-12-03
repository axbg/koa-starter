const {Schema} = require('mongoose');
const bcrypt = require('bcrypt');

const {PASSWORD_SALT_ROUNDS} = require('../../properties');
const {KoaError} = require('../../types/error');

module.exports = (db) => {
  const UserSchema = new Schema({
    email: {type: String, required: true},
    password: String,
    firstname: String,
    lastname: String,
    picture: String,
  });

  UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
      return next();
    }

    const salt = await bcrypt.genSalt(PASSWORD_SALT_ROUNDS);
    const hash = await bcrypt.hash(this.password, salt);

    if (hash) {
      this.password = hash;
      next();
    } else {
      return next(KoaError('Bad error occurred', 500));
    }
  });

  UserSchema.methods.comparePassword = async function(password) {
    return !this.password ? false : await bcrypt.compare(password, this.password);
  };

  return db.model('user', UserSchema);
};
