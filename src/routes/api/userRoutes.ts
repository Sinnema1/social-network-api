import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} from '../../controllers/userController.js';

const userRouter = Router();

// GET all users and POST a new user
userRouter.route('/')
  .get(getAllUsers)     // GET /api/users
  .post(createUser);    // POST /api/users

// GET, PUT, DELETE a user by ID
userRouter.route('/:id')
  .get(getUserById)     // GET /api/users/:id
  .put(updateUser)      // PUT /api/users/:id
  .delete(deleteUser);  // DELETE /api/users/:id

// Add and remove a friend
userRouter.route('/:userId/friends/:friendId')
  .post(addFriend)      // POST /api/users/:userId/friends/:friendId
  .delete(removeFriend);// DELETE /api/users/:userId/friends/:friendId

export default userRouter;