import { Request, Response } from 'express';
import { User, Thought } from "../models/index.js";

// Get all thoughts
export const getAllThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get a thought by ID
export const getThoughtById = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.id);
    thought ? res.json(thought) : res.status(404).json({ message: 'Thought not found' });
  } catch (error) {
    res.status(500).json(error);
  }
};

// Create a new thought and associate it with a user
export const createThought = async (req: Request, res: Response) => {
  try {
    const newThought = await Thought.create(req.body);
    await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: newThought._id } });
    res.json(newThought);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update a thought
export const updateThought = async (req: Request, res: Response) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedThought);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete a thought
export const deleteThought = async (req: Request, res: Response) => {
  try {
    await Thought.findByIdAndDelete(req.params.id);
    res.json({ message: 'Thought deleted' });
  } catch (error) {
    res.status(500).json(error);
  }
};

// Add a reaction
export const addReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { new: true }
    );
    res.json(thought);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Remove a reaction
export const removeReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );
    res.json(thought);
  } catch (error) {
    res.status(500).json(error);
  }
};