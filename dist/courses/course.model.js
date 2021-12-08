"use strict";
/*
 * This file contains the model for the schema in the database
 *
 *
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const courseSchema = new mongoose_1.default.Schema({
    code: {
        type: String,
        required: true,
        unique: true, // Setting that it has to be unique
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    progression: {
        type: String,
        default: null,
    },
    syllabus: {
        type: String,
        default: null,
    },
    semester: {
        type: String,
        required: true
    }
});
const Course = mongoose_1.default.model('Course', courseSchema);
exports.default = Course;
