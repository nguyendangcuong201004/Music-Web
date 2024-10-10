import mongoose from "mongoose";

const rolesSchema = new mongoose.Schema({
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
})

const Role = mongoose.model('Role', rolesSchema , "roles")

module.exports = Role;