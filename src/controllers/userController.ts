import { Request, Response } from "express";
import { User } from "../models/index.js";

// /**
//  * GET All Users /user
//  * @returns an array of Users
// */
export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};