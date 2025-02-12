"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    id: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true
    },
    needsPasswordChange: {
        type: Boolean,
        default: true,
    },
    role: {
        type: String,
        enum: ['student', 'faculty', 'admin'],
    },
    status: {
        type: String,
        enum: ['in-progress', 'blocks'],
        default: 'in-progress'
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true, //createdat updatedat  mongoose bydefault create kora
});
exports.User = (0, mongoose_1.model)('User', userSchema);
