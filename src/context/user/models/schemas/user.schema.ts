import { Schema, model, Document } from 'mongoose';
interface UserDocument extends Document {
    name: string;
    lastName: string;
    email: string;
    password: string;
}


const UserSchema = new Schema<UserDocument>(
    {
        name: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    }
)


const UserModel = model<UserDocument>('user', UserSchema)
export { UserModel, UserSchema, UserDocument }