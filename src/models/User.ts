import { Schema, model, type Document } from "mongoose";

interface IUser extends Document {
    username: string;
    email: string;
    thoughts: Schema.Types.ObjectId[];
    friends: Schema.Types.ObjectId[];
    friendCount?: number;
}

const userSchema = new Schema<IUser>(
    {
        username: { 
            type: String, 
            unique: true, 
            required: true, 
            trim: true 
        },
        email: { 
            type: String, 
            unique: true, 
            required: true, 
            match: [/.+@.+\..+/, 'Must match a valid email address!'] 
        },
        thoughts: [{ 
            type: Schema.Types.ObjectId, 
            ref: 'Thought' 
        }],
        friends: [{ 
            type: Schema.Types.ObjectId, 
            ref: 'User' 
        }],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Virtual for friend count
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model<IUser>('User', userSchema);
export default User;