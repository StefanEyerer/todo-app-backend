import { Document, Model, model, Schema } from 'mongoose';

interface IUser extends Document {
    email: string;
    username: string;
    password: string;
}

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true, trim: true, minlength: 8 },
    username: { type: String, required: true, unique: true, trim: true, minlength: 3 },
    password: { type: String, required: true }
});

const UserModel: Model<IUser> = model('User', UserSchema);

export default UserModel;
