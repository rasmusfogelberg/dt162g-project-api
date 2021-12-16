/*
 * This file is the Router of the webservice. I use Express Router function
 * and depending on the verb and what you put in the URI the router will
 * perform different operations
 *
 */

import express from 'express';
import { findAll, findSingle, remove, create, update, updateSetForExercise } from './exercises.service';

export const exercisesRouter = express.Router();

// Get all execises
exercisesRouter.get('/', async (_req, res) => {
  try {
    const execises = await findAll();
    res.send(execises);
  } catch (error) {
    res.status(500).send({
      message: 'Sever error',
    });
  }
});

// Get single execise
exercisesRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const execise = await findSingle(id);

    // If there is a execise on the given ID it will show the execise
    if (!execise) {
      // If there is nothing on the id send back 404
      res.status(404).send({
        message: 'Workout not found.',
      });
    }

    res.send(execise);
  } catch (error) {
    res.status(500).send({
      message: 'Sever error',
    });
  }
});

// Delete single execise
exercisesRouter.delete('/:id', async (req, res) => {
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

// Create a execise
exercisesRouter.post('/', async (req, res) => {
  try {
    const { name, sets } = req.body;

    await create({
      name,
      sets,
    });

    res.status(200).send({
      message: 'Successfully created',
    });
  } catch (error) {
    res.status(500).send({
      message: `Sever error ${error}`,
    });
  }
});

exercisesRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { name, sets } = req.body;

    await update({
      id,
      name,
      sets,
    });
    res.status(200).send({
      message: 'Successfully updated',
    });
  } catch (error) {
    res.status(500).send({
      message: `Server error ${error}`,
    });
  }
});

exercisesRouter.put('/:exerciseId/set/:setId', async (req, res) => {
  try {
    const { exerciseId, setId } = req.params;

    const { reps, weight } = req.body;

    await updateSetForExercise({
      exerciseId,
      setId,
      reps,
      weight,
    });
    res.status(200).send({
      message: 'Successfully updated set',
    });
  } catch (error) {
    res.status(500).send({
      message: `Server error ${error}`,
    });
  }
});