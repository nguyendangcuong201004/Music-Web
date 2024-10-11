"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var rolesSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    permissions: {
        type: Array,
        default: []
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    createdBy: String,
    deletedBy: String,
    deletedAt: Date,
    updatedBy: String,
    permissionsedBy: String
}, {
    timestamps: true
});
var Role = mongoose_1.default.model('Role', rolesSchema, "roles");
module.exports = Role;
