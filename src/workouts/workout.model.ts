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
  // exercises: [exerciseSchema]
  exercises: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise'
    }
  ]
});

const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;