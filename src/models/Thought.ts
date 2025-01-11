import { Schema, Types, model, type Document } from "mongoose";

// interface IAssignment extends Document {
//     assignmentId: Schema.Types.ObjectId,
//     name: string,
//     score: number
// }

// interface IStudent extends Document {
//     first: string,
//     last: string,
//     github: string,
//     assignments: Schema.Types.ObjectId[]
// }
interface IReaction extends Document {
  reactionId: Schema.Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}

interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: Schema.Types.ObjectId[];
}

const reactionSchema = new Schema<IReaction>(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      equired: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    _id: false,
  }
);

const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlegnth: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    timestamps: true,
  }
);

const Thought = model('Thought', thoughtSchema);
export default Thought;

// const assignmentSchema = new Schema<IAssignment>(
//     {
//         assignmentId: {
//             type: Schema.Types.ObjectId,
//             default: () => new Types.ObjectId(),
//         },
//         name: {
//             type: String,
//             required: true,
//             maxlength: 50,
//             minlength: 4,
//             default: 'Unnamed assignment',
//         },
//         score: {
//             type: Number,
//             required: true,
//             default: () => Math.floor(Math.random() * (100 - 70 + 1) + 70),
//         },
//     },
//     {
//         timestamps: true,
//         _id: false
//     }
// );

// const studentSchema = new Schema<IStudent>({
//     first: {
//         type: String,
//         required: true,
//         max_length: 50,
//     },
//     last: {
//         type: String,
//         required: true,
//         max_length: 50,
//     },
//     github: {
//         type: String,
//         required: true,
//         max_length: 50,
//     },
//     assignments: [assignmentSchema],
// },
//     {
//         toJSON: {
//             getters: true,
//         },
//         timestamps: true
//     }
// );

// const Student = model('Student', studentSchema);

// export default Student;
