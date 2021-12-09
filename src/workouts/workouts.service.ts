import { IExercise } from "../exercises/exercises.service";
import Workout from "./workout.model";

interface IWorkout {
  id?: string;
  name: string;
  exercises: IExercise[];
}

// Function to get all workouts
export const findAll = async () => {
  return await Workout.find().populate({ path: 'exercises' });
};

// Function to get single workout
export const findSingle = async (id: string) => {
  return await Workout.findById(id);
};

// Function to delete single workout
export const remove = async (id: string) => {
  return await Workout.findByIdAndDelete(id);
};

export const create = async (partialWorkout: IWorkout) => {
  return await Workout.create(partialWorkout);
}

export const update = async (partialWorkout: IWorkout) => {
  return await Workout.findByIdAndUpdate(partialWorkout.id, partialWorkout);
}