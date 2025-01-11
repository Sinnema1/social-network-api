import { Types } from "mongoose";

const usernames = ["test1", "test2", "test3", "test4", "test5"];

// thought examples
const thoughtTexts = [
  "Just finished learning about MongoDB!",
  "JavaScript is awesome.",
  "Debugging is like being the detective in a crime movie where you are also the murderer.",
  "Working on a new project. Exciting times ahead!",
  "Why does my code work? I don't know, but I'm glad it does!",
  "Coding late into the night again!",
];

// reaction examples
const reactionBodies = [
  "Nice!",
  "I totally agree!",
  "Keep it up!",
  "Amazing thought!",
  "Haha, true!",
  "Wow, that's insightful.",
];

// function to get a random item from any array
export const getRandomArrItem = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

// create test users (test1 to test5)
export const getUsers = () => {
  return usernames.map((username) => ({
    _id: new Types.ObjectId(),
    username,
    email: `${username}@mail.com`,
    thoughts: [],
    friends: [],
  }));
};

// create random thoughts for users
export const getRandomThoughts = (
  numThoughts: number,
  userIds: Types.ObjectId[]
) => {
  const thoughts = [];

  for (let i = 0; i < numThoughts; i++) {
    const randomUser = getRandomArrItem(userIds);

    thoughts.push({
      thoughtText: getRandomArrItem(thoughtTexts),
      username: usernames[userIds.indexOf(randomUser)],
      userId: randomUser,
      reactions: [
        {
          reactionId: new Types.ObjectId(),
          reactionBody: getRandomArrItem(reactionBodies),
          username: getRandomArrItem(usernames),
          createdAt: new Date(),
        },
      ],
      createdAt: new Date(),
    });
  }

  return thoughts;
};
