const UserModel = require('../models').UserModel;

const getOrCreateUserId = async (profile) => {
    // handle user login
    // info returned by the oauth providers is stored in the "profile" parameter
    return { id: "_userid" };
};

module.exports = {
    getOrCreateUserId
}