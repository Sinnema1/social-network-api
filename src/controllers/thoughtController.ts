import { Request, Response } from 'express';
import { User, Thought } from "../models/index.js";

/**
 * GET All Thoughts /api/thoughts
 * @returns an array of all thought objects
 */
export const getAllThoughts = async (_req: Request, res: Response): Promise<Response | void> => {
  try {
    const thoughts = await Thought.find();
    return res.json(thoughts);
  } catch (error: any) {
    return res.status(500).json({ message: 'Error fetching thoughts.', error });
  }
};

/**
 * GET a Thought by ID /api/thoughts/:id
 * @param string id - Thought ID
 * @returns a single thought object
 */
export const getThoughtById = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found.' });
    }
    return res.json(thought);
  } catch (error: any) {
    return res.status(500).json({ message: 'Error fetching thought.', error });
  }
};

/**
 * POST Create a New Thought /api/thoughts
 * @param object thought - New thought data
 * @returns the created thought object
 */
export const createThought = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { thoughtText, username, userId } = req.body;

    if (!thoughtText || !username || !userId) {
      return res.status(400).json({ message: 'thoughtText, username, and userId are required.' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const newThought = await Thought.create(req.body);

    await User.findByIdAndUpdate(userId, { $push: { thoughts: newThought._id } });

    return res.status(201).json(newThought);
  } catch (error: any) {
    return res.status(500).json({ message: 'Error creating thought.', error });
  }
};

/**
 * PUT Update a Thought by ID /api/thoughts/:id
 * @param string id - Thought ID
 * @param object thought - Updated thought data
 * @returns the updated thought object
 */
export const updateThought = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found.' });
    }

    return res.json(updatedThought);
  } catch (error: any) {
    return res.status(500).json({ message: 'Error updating thought.', error });
  }
};

/**
 * DELETE a Thought /api/thoughts/:id
 * @param string id - Thought ID
 * @returns success message
 */
export const deleteThought = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.id);

    if (!thought) {
      return res.status(404).json({ message: 'Thought not found.' });
    }

    await User.findOneAndUpdate(
      { thoughts: req.params.id },
      { $pull: { thoughts: req.params.id } }
    );

    return res.json({ message: 'Thought and its associations deleted.' });
  } catch (error: any) {
    return res.status(500).json({ message: 'Error deleting thought.', error });
  }
};

/**
 * POST Add a Reaction to a Thought /api/thoughts/:thoughtId/reactions
 * @param string thoughtId - Thought ID
 * @param object reaction - Reaction data
 * @returns the updated thought object with the new reaction
 */
export const addReaction = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);

    if (!thought) {
      return res.status(404).json({ message: 'Thought not found.' });
    }

    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    );

    return res.json(updatedThought);
  } catch (error: any) {
    return res.status(500).json({ message: 'Error adding reaction.', error });
  }
};

/**
 * DELETE a Reaction from a Thought /api/thoughts/:thoughtId/reactions/:reactionId
 * @param string thoughtId - Thought ID
 * @param string reactionId - Reaction ID
 * @returns the updated thought object with the reaction removed
 */
export const removeReaction = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);

    if (!thought) {
      return res.status(404).json({ message: 'Thought not found.' });
    }

    const reactionExists = thought.reactions.some(
      (reaction) => reaction.reactionId.toString() === req.params.reactionId
    );

    if (!reactionExists) {
      return res.status(404).json({ message: 'Reaction not found.' });
    }

    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );

    return res.json(updatedThought);
  } catch (error: any) {
    return res.status(500).json({ message: 'Error removing reaction.', error });
  }
};