const {DataTypes} = require('sequelize');
const uuid = require('uuid');
const bcrypt = require('bcrypt');

const {PASSWORD_SALT_ROUNDS} = require('../../properties');

const hashPassword = async (user) => {
  if (user.changed('password')) {
    const salt = await bcrypt.genSalt(PASSWORD_SALT_ROUNDS);
    const hash = await bcrypt.hash(user.password, salt);

    if (hash) {
      user.password = hash;
    }
  }
};

module.exports = (sequelize) => {
  const UserModel = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => {
        return uuid.v4();
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  UserModel.beforeCreate(hashPassword);

  UserModel.prototype.comparePassword = async function(password) {
    return !this.password ? false : await bcrypt.compare(password, this.password);
  };

  return UserModel;
};
