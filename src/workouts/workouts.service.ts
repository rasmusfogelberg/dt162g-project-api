import Workout from "./workout.model";

// Function to get all workouts
export const findAll = async () => {
  return await Workout.find();
};

// Function to get single workout
export const findSingle = async (id: string) => {
  return await Workout.findById(id);
};

// Function to delete single workout
export const remove = async (id: string) => {
  return await Workout.findByIdAndDelete(id);
};

export const create = async (partialWorkout: { code: any; name: any; semester: any; }) => {
  return await Workout.create(partialWorkout);
}