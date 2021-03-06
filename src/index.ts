/* 
 * This is the main file for the web service. It uses express and  
 * imports everything from other ts-files for the web service to work.
 * 
 * 
 */
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

import {
  workoutsRouter
} from './workouts/workouts.router';
import { exercisesRouter } from './exercises/exercises.router';

// Declaring uri from the information set in .env file.
const uri = `${process.env.MONGO_URI}/${process.env.MONGO_DB_NAME}`;

(async () => {
  try {
    // Establish connection
    await mongoose.connect(uri);

    console.log(`### Established connection to DB ###`);

    // Setting the imported express to the variable app
    const app = express();

    // Port for localhost set to what there is in .env
    // If .env has no value for port it will default to 3000
    const port = process.env.LOCAL_PORT || 3000;

    // Using cors to allow all requests from a client
    app.use(cors());

    // Setup json body parsing to parse the incoming requests with JSON payloads
    app.use(express.json());

    // Setup routes
    app.use('/workouts', workoutsRouter);
    app.use('/exercises', exercisesRouter);

    // When server is started it will print this message in the console
    app.listen(port, () => {
      console.log(`### Server running at http://localhost:${port} ###`);
    });
  } catch (error) {
    console.log(`Error: ${error}`);
    process.exit(1); // Exit the process with error code
  }
})();