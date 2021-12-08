"use strict";
/*
 * This file is the Router of the webservice. I use Express Router function
 * and depending on the verb and what you put in the URI the router will
 * perform different operations
 *
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.coursesRouter = void 0;
const express_1 = __importDefault(require("express"));
const courses_service_js_1 = require("./courses.service.js");
exports.coursesRouter = express_1.default.Router();
// Get all courses
exports.coursesRouter.get('/', async (_req, res) => {
    try {
        const courses = await (0, courses_service_js_1.findAll)();
        res.send(courses);
    }
    catch (error) {
        res.status(500).send({
            message: 'Sever error'
        });
    }
});
// Get single course
exports.coursesRouter.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const course = await (0, courses_service_js_1.findSingle)(id);
        // If there is a course on the given ID it will show the course
        if (!course) {
            // If there is nothing on the id send back 404
            res.status(404).send({
                message: 'Course not found.'
            });
        }
        res.send(course);
    }
    catch (error) {
        res.status(500).send({
            message: 'Sever error'
        });
    }
});
// Delete single course
exports.coursesRouter.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await (0, courses_service_js_1.remove)(id);
        res.status(204).end();
    }
    catch (error) {
        res.status(500).send({
            message: 'Sever error'
        });
    }
});
// Create a course
exports.coursesRouter.post('/', async (req, res) => {
    try {
        const { code, name, semester } = req.body;
        await (0, courses_service_js_1.create)({
            code,
            name,
            semester
        });
        res.status(200).send({
            message: 'Successfully created'
        });
    }
    catch (error) {
        res.status(500).send({
            message: `Sever error ${error}`
        });
    }
});
