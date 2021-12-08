"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.remove = exports.findSingle = exports.findAll = void 0;
const course_model_js_1 = __importDefault(require("./course.model.js"));
// Function to get all courses
const findAll = async () => {
    return await course_model_js_1.default.find();
};
exports.findAll = findAll;
// Function to get single course
const findSingle = async (id) => {
    return await course_model_js_1.default.findById(id);
};
exports.findSingle = findSingle;
// Function to delete single course
const remove = async (id) => {
    return await course_model_js_1.default.findByIdAndDelete(id);
};
exports.remove = remove;
const create = async (partialCourse) => {
    return await course_model_js_1.default.create(partialCourse);
};
exports.create = create;
