import { ObjectId } from 'mongodb';
import Exercise from './exercise.model';

// Interface for an exercise
export interface IExercise {
  id?: string;
  name: string;
  sets: ISet[];
}

// Interface for a set in an exercise
export interface ISet {
  id?: string;
  weight: number;
  reps: number;
}

// Interface used when updating a single set in an exercise
interface ISingleSet {
  exerciseId: string;
  setId: string;
  reps: number;
  weight: number;
}


// Function to get all exercises
export const findAll = async () => {
  return await Exercise.find();
};

// Function to get single exercise
export const findSingle = async (id: string) => {
  return await Exercise.findById(id);
};

// Function to delete single exercise
export const remove = async (id: string) => {
  return await Exercise.findByIdAndDelete(id);
};

// Function to create new exercise
export const create = async (partialExercise: { name: string; sets: ISet[] }) => {
  return await Exercise.create(partialExercise);
};

// Function to update specific exercise
export const update = async ({ id, name, sets }: IExercise) => {
  return await Exercise.findByIdAndUpdate({ _id: id }, { name, sets }, { upsert: true });
};

// Function to update specific set in specific exercise
export const updateSetForExercise = async ({ exerciseId, setId, reps, weight }: ISingleSet) => {
  return await Exercise.findOneAndUpdate(
    { _id: exerciseId, 'sets._id': new ObjectId(setId) },
    { 'sets.$.weight': weight, 'sets.$.reps': reps },
  );
};
