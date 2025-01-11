import { User, Thought } from '../models/index.js';
import db from '../config/connection';

const cleanDB = async (): Promise<void> => {
  try {
    // Connect to the database
    const connection = await db();
    console.log('Database connected. Cleaning collections...');

    // Delete all users
    await User.deleteMany({});
    console.log('User collection cleaned.');

    // Delete all thoughts
    await Thought.deleteMany({});
    console.log('Thought collection cleaned.');

    // Close the database connection
    await connection.close();
    console.log('Database connection closed.');

    process.exit(0);
  } catch (err) {
    console.error('Error cleaning collections:', err);
    process.exit(1);
  }
};

export default cleanDB;