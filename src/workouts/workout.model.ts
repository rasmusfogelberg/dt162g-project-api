/* 
 * This file contains the model for the schema in the database
 *
 * 
 */

import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
});

const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;