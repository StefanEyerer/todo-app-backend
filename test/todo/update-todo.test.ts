import jwt from 'jsonwebtoken';
import request from 'supertest';
import app from '../../src/app';
import testData from '../test-data.json';
import { ConnectionInfo, connectToDatabase, disconnectFromDatabase, populateDatabase } from '../test-utils';

describe('Endpoint PUT /todo/:id', () => {
    let connectionInfo: ConnectionInfo;

    beforeAll(async () => {
        connectionInfo = await connectToDatabase();
        await populateDatabase();
    });

    afterAll(async () => {
        await disconnectFromDatabase(connectionInfo);
    });

    test('should return 200, if todo with given id exists and belongs to user', async () => {
        const requestedTodoId = testData.todos[0]._id;
        const userId = testData.users[0]._id;
        const jwtToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET);

        const response = await request(app)
            .put(`/api/todo/${requestedTodoId}`)
            .send({ completed: true })
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${jwtToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(requestedTodoId);
        expect(response.body.completed).toBe(true);
    });

    test('should return 404, if todo with given id exists but does not belong to user', async () => {
        const requestedTodoId = testData.todos[3]._id;
        const userId = testData.users[0]._id;
        const jwtToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET);

        const response = await request(app)
            .put(`/api/todo/${requestedTodoId}`)
            .send({ completed: false })
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${jwtToken}`);

        expect(response.statusCode).toBe(404);
    });

    test('should return 404, if todo with given id does not exist', async () => {
        const requestedTodoId = '609591558d3773dcfa8fcf2a';
        const userId = testData.users[0]._id;
        const jwtToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET);

        const response = await request(app)
            .put(`/api/todo/${requestedTodoId}`)
            .send({ completed: false })
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${jwtToken}`);

        expect(response.statusCode).toBe(404);
    });

    test('should return 401, if user is not authenticated', async () => {
        const requestedTodoId = testData.todos[0]._id;

        const response = await request(app)
            .put(`/api/todo/${requestedTodoId}`)
            .send({ completed: false })
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(401);
    });

    test('should return 400, if todo id is not a valid id', async () => {
        const requestedTodoId = '12345';
        const userId = testData.users[0]._id;
        const jwtToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET);

        const response = await request(app)
            .put(`/api/todo/${requestedTodoId}`)
            .send({ completed: false })
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${jwtToken}`);

        expect(response.statusCode).toBe(400);
    });
});
