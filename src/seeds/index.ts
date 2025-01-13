import db from '../config/connection.js';
import { User, Thought } from '../models/index.js';
import { getUsers, getRandomThoughts } from './data.js';
import { Types } from 'mongoose';

const seedDatabase = async (): Promise<void> => {
  try {
    const connection = await db();
    console.log('Database connected.');

    // clean database
    await User.deleteMany({});
    await Thought.deleteMany({});
    console.log('Collections cleaned.');

    // test users
    const users = getUsers();
    const createdUsers = await User.insertMany(users);
    console.log(`${createdUsers.length} users seeded.`);

    // cast user IDs to ObjectId[]
    const userIds: Types.ObjectId[] = createdUsers.map(user => user._id as Types.ObjectId);

    // random thoughts for users
    const thoughts = getRandomThoughts(10, userIds);

    // each thought has userId field
    const createdThoughts = await Promise.all(
      thoughts.map(async (thought) => {
        const newThought = await Thought.create(thought);
        await User.findByIdAndUpdate(
          thought.userId as Types.ObjectId,
          { $push: { thoughts: newThought._id as Types.ObjectId } },
          { new: true }
        );
        return newThought;
      })
    );
    console.log(`${createdThoughts.length} thoughts seeded and linked to users.`);

    // one unique friend to each user
    for (const user of createdUsers) {
      // not current user
      const potentialFriends = createdUsers.filter(
        u => (u._id as Types.ObjectId).toString() !== (user._id as Types.ObjectId).toString()
      );

      // randomly select one friend
      const randomFriend = potentialFriends[Math.floor(Math.random() * potentialFriends.length)];

      // add friend if one exists
      if (randomFriend) {
        await User.findByIdAndUpdate(
          user._id as Types.ObjectId,
          { $addToSet: { friends: randomFriend._id as Types.ObjectId } },
          { new: true }
        );
      }
    }
    console.log("One friend assigned to each user.");

    // close the connection
    await connection.close();
    console.log('Database connection closed.');

    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedDatabase();