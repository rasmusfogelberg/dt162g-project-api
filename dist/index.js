"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * This is the main file for the web service. It uses express and
 * imports everything from other js-files for the web service to work.
 *
 *
 */
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const courses_router_js_1 = require("./courses/courses.router.js");
// Declaring uri from the information set in .env file.
const uri = `${process.env.MONGO_URI}/${process.env.MONGO_DB_NAME}`;
(async () => {
    try {
        // Establish connection
        await mongoose_1.default.connect(uri);
        console.log(`### Established connection to DB ###`);
        // Setting the imported express to the variable app
        const app = (0, express_1.default)();
        // Port for localhost set to 3000
        const port = 3000;
        // Using cors to allow all requests from a client
        app.use((0, cors_1.default)());
        // Setup json body parsing to parse the incoming requests with JSON payloads
        app.use(express_1.default.json());
        // Setup routes
        app.use('/courses', courses_router_js_1.coursesRouter);
        // When server is started it will print this message in the console
        app.listen(port, () => {
            console.log(`### Server running at http://localhost:${port} ###`);
        });
    }
    catch (error) {
        console.log(`Error: ${error}`);
        process.exit(1); // Exit the process with error code
    }
    finally {
        // Always close connections when done or on errors
        // await mongoose.disconnect();
    }
})();
