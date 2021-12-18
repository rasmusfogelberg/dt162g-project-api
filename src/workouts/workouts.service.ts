import { ObjectId } from 'mongodb';
import Exercise from '../exercises/exercise.model';
import { IExercise } from '../exercises/exercises.service';
import Workout from './workout.model';

interface IWorkout {
  id?: string;
  name: string;
  startedDate: string;
  endedDate?: string;
  exercises?: IExercise[];
}

// Function to get all workouts
export const findAll = async () => {
  return await Workout.find().populate({ path: 'exercises' });
};

// Function to get single workout
export const findSingle = async (id: string) => {
  return await Workout.findById(id).populate({ path: 'exercises' });
};

// Function to delete single workout
export const remove = async (id: string) => {
  return await Workout.findByIdAndDelete(id);
};

export const create = async (partialWorkout: IWorkout) => {
  return await Workout.create(partialWorkout);
};

export const update = async (partialWorkout: IWorkout) => {
  return await Workout.findByIdAndUpdate(partialWorkout.id, partialWorkout);
};

export const updateExercisesForWorkout = async (workoutId: any, exercises: any) => {
  const bulkUpdates = exercises.map((exercise: any) => {
    return {
      updateOne: {
        filter: { name: exercise.name },
        update: { $set: { sets: exercise.sets } },
        upsert: true,
      },
    };
  });

  try {
    await Exercise.bulkWrite(bulkUpdates);
  } catch (error) {
    console.error(error);
  }

  return await Workout.findByIdAndUpdate({ _id: new ObjectId(workoutId) }, { $set: { exercises: exercises } });
};
