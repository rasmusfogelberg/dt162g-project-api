/*
 * This file contains the model for the schema in the database
 *
 */

import mongoose from 'mongoose';

// Schema for sets
export const setSchema = new mongoose.Schema({
  weight: {
    type: Number,
    required: true,
  },
  reps: {
    type: Number,
    required: true,
    min: 0,
  },
});

// Schema for exercises
export const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sets: [setSchema],
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

export default Exercise;
