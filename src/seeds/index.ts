import db from '../config/connection.js';
import { User, Thought } from '../models/index.js';
import { getUsers, getRandomThoughts } from './data.js';

const seedDatabase = async (): Promise<void> => {
  try {
    const connection = await db();
    console.log('Database connected.');

    // Clean the database
    await User.deleteMany({});
    await Thought.deleteMany({});
    console.log('Collections cleaned.');

    // Insert test users
    const users = getUsers();
    await User.insertMany(users);
    console.log('Users seeded.');

    // Insert random thoughts for users
    const thoughts = getRandomThoughts(10, users.map(user => user._id));
    await Thought.insertMany(thoughts);
    console.log('Thoughts seeded.');

    // Close the connection
    await connection.close();
    console.log('Database connection closed.');

    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedDatabase();