/* 
 * This file contains the model for the schema in the database
 *
 * 
 */

import mongoose from "mongoose";
import { exerciseSchema } from "../exercises/exercise.model";

const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  startedDate: {
    type: Date
  },
  endedDate: {
    type: Date
  },
  exercises: [exerciseSchema]
});

const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;