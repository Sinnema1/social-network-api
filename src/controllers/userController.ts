import { Request, Response } from 'express';
import { User, Thought } from "../models/index.js";

/**
 * GET All Users /api/users
 * @returns an array of users with populated thoughts and friends
 */
export const getAllUsers = async (_req: Request, res: Response): Promise<Response | void> => {
  try {
    const users = await User.find().populate('thoughts').populate('friends');
    return res.json({ users, count: users.length });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * GET a User by ID /api/users/:id
 * @param string id - User ID
 * @returns a single user with populated thoughts and friends
 */
export const getUserById = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const user = await User.findById(req.params.id).populate('thoughts').populate('friends');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    return res.json(user);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * POST Create a New User /api/users
 * @param object user - New user data
 * @returns the created user object
 */
export const createUser = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { username, email } = req.body;

    if (!username || !email) {
      return res.status(400).json({ message: 'Username and email are required.' });
    }

    const newUser = await User.create(req.body);
    return res.status(201).json(newUser);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * PUT Update a User by ID /api/users/:id
 * @param string id - User ID
 * @param object user - Updated user data
 * @returns the updated user object
 */
export const updateUser = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.json(updatedUser);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE a User and Their Thoughts /api/users/:id
 * @param string id - User ID
 * @returns success message
 */
export const deleteUser = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    await Thought.deleteMany({ _id: { $in: user.thoughts } });

    return res.json({ message: 'User and their associated thoughts have been deleted.' });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * POST Add a Friend /api/users/:userId/friends/:friendId
 * @param string userId - User ID
 * @param string friendId - Friend's User ID
 * @returns the updated user object with the new friend added
 */
export const addFriend = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { userId, friendId } = req.params;

    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: 'User or friend not found.' });
    }

    if (user.friends.some((id) => id.toString() === friendId)) {
      return res.status(400).json({ message: 'Friend already added.' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friendId } },
      { new: true }
    );

    return res.json(updatedUser);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE a Friend /api/users/:userId/friends/:friendId
 * @param string userId - User ID
 * @param string friendId - Friend's User ID
 * @returns the updated user object with the friend removed
 */
export const removeFriend = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { userId, friendId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (!user.friends.some((id) => id.toString() === friendId)) {
      return res.status(404).json({ message: 'Friend not in user\'s friend list.' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { friends: friendId } },
      { new: true }
    );

    return res.json({ message: 'Friend removed.', user: updatedUser });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};