"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var accountSchema = new mongoose_1.default.Schema({
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
});
var Account = mongoose_1.default.model('Account', accountSchema, "accounts");
exports.default = Account;
