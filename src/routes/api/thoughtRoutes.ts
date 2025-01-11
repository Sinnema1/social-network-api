import { Router } from 'express';
import {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} from '../../controllers/thoughtController.js';

const thoughtRouter = Router();

// GET all thoughts and POST a new thought
thoughtRouter.route('/')
  .get(getAllThoughts)      // GET /api/thoughts
  .post(createThought);     // POST /api/thoughts

// GET, PUT, DELETE a thought by ID
thoughtRouter.route('/:id')
  .get(getThoughtById)      // GET /api/thoughts/:id
  .put(updateThought)       // PUT /api/thoughts/:id
  .delete(deleteThought);   // DELETE /api/thoughts/:id

// Add and remove a reaction to a thought
thoughtRouter.route('/:thoughtId/reactions')
  .post(addReaction);       // POST /api/thoughts/:thoughtId/reactions

thoughtRouter.route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);  // DELETE /api/thoughts/:thoughtId/reactions/:reactionId

export default thoughtRouter;