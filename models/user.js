const UserModelSchema = (db) => {
    return db.model("user", db.Schema({
        email: String,
        name: String
    }))
};

module.exports = UserModelSchema;