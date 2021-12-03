const {UserModel} = require('../models');

const checkAuthentication = async (email, password) => {
  // Mongoose
  const user = await UserModel.findOne({email: email});

  // Sequelize
  // const user = await UserModel.findOne({where: {email: email}});

  return user ? ((await user.comparePassword(password)) ? user.id : false) :
      (await UserModel.create({email: email, password: password})).id;
};

const getOrCreateUser = async (profile) => {
  // Mongoose
  const existingUser = await UserModel.findOne({email: profile.email});

  // Sequelize
  // const existingUser = await UserModel.findOne({where: {email: profile.email}});

  if (existingUser) {
    return {_id: existingUser._id};
  }

  const newUser = await UserModel.create(profile);
  return {_id: newUser._id};
};

module.exports = {
  checkAuthentication,
  getOrCreateUser,
};
