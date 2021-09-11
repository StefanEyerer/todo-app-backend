import jwt from 'jsonwebtoken';
import request from 'supertest';
import app from '../../src/app';
import testData from '../test-data.json';
import { ConnectionInfo, connectToDatabase, disconnectFromDatabase, populateDatabase } from '../test-utils';

describe('Endpoint POST /todo', () => {
    let connectionInfo: ConnectionInfo;

    beforeAll(async () => {
        connectionInfo = await connectToDatabase();
        await populateDatabase();
    });

    afterAll(async () => {
        await disconnectFromDatabase(connectionInfo);
    });

    test('should return 201, if todo is created successfully', async () => {
        const userId = testData.users[0]._id;
        const jwtToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET);
        const title = 'SomeTitle';
        const description = 'SomeDescription';
        const completed = false;

        const response = await request(app)
            .post('/api/todo')
            .send({
                title,
                description,
                completed
            })
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${jwtToken}`);

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(title);
        expect(response.body.description).toBe(description);
        expect(response.body.user.id).toBe(userId);
    });

    test('should return 400, if no title is provided', async () => {
        const userId = testData.users[0]._id;
        const jwtToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET);
        const description = 'SomeDescription';
        const completed = false;

        const response = await request(app)
            .post('/api/todo')
            .send({
                description,
                completed
            })
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${jwtToken}`);

        expect(response.statusCode).toBe(400);
    });

    test('should return 400, if no description is provided', async () => {
        const userId = testData.users[0]._id;
        const jwtToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET);
        const title = 'SomeTitle';
        const completed = false;

        const response = await request(app)
            .post('/api/todo')
            .send({
                title,
                completed
            })
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${jwtToken}`);

        expect(response.statusCode).toBe(400);
    });

    test('should return 400, if no completed status is provided', async () => {
        const userId = testData.users[0]._id;
        const jwtToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET);
        const title = 'SomeTitle';
        const description = 'SomeDescription';

        const response = await request(app)
            .post('/api/todo')
            .send({
                title,
                description
            })
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${jwtToken}`);

        expect(response.statusCode).toBe(400);
    });

    test('should return 401, if user is not authenticated', async () => {
        const title = 'SomeTitle';
        const description = 'SomeDescription';
        const completed = false;

        const response = await request(app)
            .post('/api/todo')
            .send({
                title,
                description,
                completed
            })
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(401);
    });
});
