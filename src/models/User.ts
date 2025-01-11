import { Schema, model, type Document } from 'mongoose';

// interface ICourse extends Document {
//     name: string,
//     inPerson: boolean,
//     start: Date,
//     end: Date,
//     students: Schema.Types.ObjectId[]
// }
interface IUser extends Document {
    username: string,
    email: string,
    thoughts: Schema.Types.ObjectId,
    friends: Schema.Types.ObjectId,
}

const userSchema = new Schema<IUser>(
    {
        username: { 
            type: String, 
            unique: true, required: true, trim: true 
        },
        email: { 
            type: String, 
            unique: true, 
            required: true, 
            match: [/.+@.+\..+/, 'Must match an email address!'] 
        },
        thoughts: [{ 
            type: Schema.Types.ObjectId, 
            ref: 'Thought' 
        }],
        friends: [{ 
            type: Schema.Types.ObjectId, 
            ref: 'User' 
        }],
    }
);

const User = model('User', userSchema);
module.exports = User;

// const courseSchema = new Schema<ICourse>(
//     {
//         name: {
//             type: String,
//             required: true,
//         },
//         inPerson: {
//             type: Boolean,
//             default: true,
//         },
//         start: {
//             type: Date,
//             default: Date.now(),
//         },
//         end: {
//             type: Date,
//             // Sets a default value of 12 weeks from now
//             default: () => new Date(+new Date() + 84 * 24 * 60 * 60 * 1000),
//         },
//         students: [
//             {
//                 type: Schema.Types.ObjectId,
//                 ref: 'student',
//             },
//         ],
//     },
//     {
//         toJSON: {
//             virtuals: true,
//         },
//         timestamps: true
//     },
// );

// const Course = model<ICourse>('Course', courseSchema);

// export default Course;
