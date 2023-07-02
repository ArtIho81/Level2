"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var mongoose_1 = require("mongoose");
var taskSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        unique: true,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    checked: {
        type: Boolean,
        required: true,
    },
});
var userSchema = new mongoose_1.Schema({
    login: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    tasks: {
        type: [taskSchema],
    },
});
exports.UserModel = (0, mongoose_1.model)("User", userSchema);
