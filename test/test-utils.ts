import bcryptjs from 'bcryptjs';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import TodoModel from '../src/models/database/todo';
import UserModel from '../src/models/database/user';
import testData from './test-data.json';

export type ConnectionInfo = {
    mongoServer: MongoMemoryServer;
    connection: typeof mongoose;
};

export async function connectToDatabase(): Promise<ConnectionInfo> {
    const mongoServer = await MongoMemoryServer.create({ binary: { arch: 'x64', version: '4.4.6' } });
    const mongoUri = mongoServer.getUri();
    const connection = await mongoose.connect(mongoUri);

    return { mongoServer, connection };
}

export async function disconnectFromDatabase(connectionInfo: ConnectionInfo): Promise<void> {
    await connectionInfo.connection.disconnect();
    await connectionInfo.mongoServer.stop();
}

export async function populateDatabase(): Promise<void> {
    const users = testData.users;
    const todos = testData.todos;

    for (const user of users) {
        const hashedPw = await bcryptjs.hash(user.password, 10);
        const userToSave = { ...user, password: hashedPw };
        const newUser = new UserModel(userToSave);
        await newUser.save();
    }

    for (const todo of todos) {
        const newTodo = await new TodoModel(todo).populate('user');
        await newTodo.save();
    }
}
