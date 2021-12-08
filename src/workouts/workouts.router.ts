/* 
 * This file is the Router of the webservice. I use Express Router function
 * and depending on the verb and what you put in the URI the router will
 * perform different operations
 * 
 */

import express from 'express';
import {
  findAll,
  findSingle,
  remove,
  create
} from './workouts.service';

export const workoutsRouter = express.Router();

// Get all workouts
workoutsRouter.get('/', async (_req, res) => {
  try {
    const workouts = await findAll();
    res.send(workouts);
  } catch (error) {
    res.status(500).send({
      message: 'Sever error'
    });
  }
});

// Get single workout
workoutsRouter.get('/:id', async (req, res) => {
  try {
    const {
      id
    } = req.params;

    const workout = await findSingle(id);

    // If there is a workout on the given ID it will show the workout
    if (!workout) {
      // If there is nothing on the id send back 404
      res.status(404).send({
        message: 'Workout not found.'
      });
    }

    res.send(workout);
  } catch (error) {
    res.status(500).send({
      message: 'Sever error'
    });
  }
});

// Delete single workout
workoutsRouter.delete('/:id', async (req, res) => {
  try {
    const {
      id
    } = req.params;

    await remove(id);

    res.status(204).end();
  } catch (error) {
    res.status(500).send({
      message: 'Sever error'
    });
  }
});

// Create a workout
workoutsRouter.post('/', async (req, res) => {
  try {
    const {
      code,
      name,
      semester
    } = req.body;

    await create({
      code,
      name,
      semester
    });

    res.status(200).send({
      message: 'Successfully created'
    });
  } catch (error) {
    res.status(500).send({
      message: `Sever error ${error}`
    });
  }
});