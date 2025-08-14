const mongoose = require('mongoose');

const UserModelSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

const UserModel = mongoose.model('UserModel', UserModelSchema);
module.exports = UserModel;