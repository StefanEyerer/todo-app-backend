import { Document, Model, model, Schema } from 'mongoose';

interface ITodo extends Document {
    title: string;
    description: string;
    completed: boolean;
    user: Schema.Types.ObjectId;
}

const TodoSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

const TodoModel: Model<ITodo> = model('Todo', TodoSchema);

export default TodoModel;
