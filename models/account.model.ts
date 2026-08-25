import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    token: String,
    phone: String,
    avatar: String,
    roleId: String,
    status: String,
    deleted: {
        type: Boolean,
        default: false,
    },
    createdBy: String,
    deletedBy: String,
    deletedAt: Date,
    updatedBy: String
}, {
    timestamps: true,
})

const Account = mongoose.model('Account', accountSchema, "accounts");

export default Account
