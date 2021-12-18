/*
 * This file is the Router of the webservice. I use Express Router function
 * and depending on the verb and what you put in the URI the router will
 * perform different operations
 *
 */

import express from 'express';
import { body, validationResult } from 'express-validator';

import { findAll, findSingle, remove, create, update, updateExercisesForWorkout } from './workouts.service';

export const workoutsRouter = express.Router();

// Get all workouts
workoutsRouter.get('/', async (_req, res) => {
  try {
    const workouts = await findAll();
    res.send(workouts);
  } catch (error) {
    res.status(500).send({
      message: 'Sever error',
    });
  }
});

// Get single workout
workoutsRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const workout = await findSingle(id);

    // If there is a workout on the given ID it will show the workout
    if (!workout) {
      // If there is nothing on the id send back 404
      res.status(404).send({
        message: 'Workout not found.',
      });
    }

    res.send(workout);
  } catch (error) {
    res.status(500).send({
      message: 'Sever error',
    });
  }
});

// Delete single workout
workoutsRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await remove(id);

    res.status(204).end();
  } catch (error) {
    res.status(500).send({
      message: 'Sever error',
    });
  }
});

// Create a workout
workoutsRouter.post('/', async (req, res) => {
  try {
    const { name, startedDate, exercises } = req.body;

    const createdWorkout = await create({
      name,
      exercises,
      startedDate
    });

    res.status(200).send({
      message: 'Successfully created workout',
      workout: createdWorkout,
    });
  } catch (error) {
    res.status(500).send({
      message: `Sever error ${error}`,
    });
  }
});

workoutsRouter.put(
  '/:id',
  body('startedDate').exists(),
  body('endedDate').custom((value, { req }) => {
    if (new Date(value) <= new Date(req.body.startedDate)) {
      throw new Error('Ended date must be valid, and after started date');
    }
    return true;
  }),
  async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      const { name, startedDate, endedDate, exercises } = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      await update({
        id,
        name,
        startedDate,
        endedDate,
        exercises,
      });

      res.status(200).send({
        message: 'Successfully updated',
      });

    } catch (error) {
      res.status(500).send({
        message: `Server error ${error}`,
      });
    }
  },
);

workoutsRouter.put('/:workoutId/batch', async (req, res) => {
  try {
    const { workoutId } = req.params;
    const { name, exercises } = req.body;

    await updateExercisesForWorkout(workoutId, exercises);

    res.status(200).send({
      message: 'Successfully updated workout',
    });
  } catch (error) {
    res.status(500).send({
      message: `Server error ${error}`,
    });
  }
});

workoutsRouter.put('/:workoutId/finish', async (req, res) => {
  try {
    const { workoutId } = req.params;
    const { name, startedAt, endedAt, exercises } = req.body;

    await updateExercisesForWorkout(workoutId, exercises);

    res.status(200).send({
      message: 'Successfully updated set',
    });
  } catch (error) {
    res.status(500).send({
      message: `Server error ${error}`,
    });
  }
});
