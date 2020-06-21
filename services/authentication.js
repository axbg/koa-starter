const UserModel = require('../models').UserModel;

const getOrCreateUser = async (profile) => {
  const existingUser = await UserModel.findOne({email: profile.email});

  if (existingUser) {
    return {_id: existingUser._id};
  }

  const newUser = await UserModel.create(profile);
  return {_id: newUser._id};
};

module.exports = {
  getOrCreateUser,
};
