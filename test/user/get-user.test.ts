import jwt from 'jsonwebtoken';
import request from 'supertest';
import app from '../../src/app';
import testData from '../test-data.json';
import { ConnectionInfo, connectToDatabase, disconnectFromDatabase, populateDatabase } from '../test-utils';

describe('Endpoint GET /users/:id', () => {
    let connectionInfo: ConnectionInfo;

    beforeAll(async () => {
        connectionInfo = await connectToDatabase();
        await populateDatabase();
    });

    afterAll(async () => {
        await disconnectFromDatabase(connectionInfo);
    });

    test('should return 200, if user with given id exists', async () => {
        const requestedUserId = testData.users[1]._id;
        const userId = testData.users[0]._id;
        const jwtToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET);

        const response = await request(app)
            .get(`/api/users/${requestedUserId}`)
            .set('Authorization', `Bearer ${jwtToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(requestedUserId);
    });

    test('should return 404, if user with given id does not exist', async () => {
        const requestedUserId = '609591021bbdb9595218aaaa';
        const userId = testData.users[0]._id;
        const jwtToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET);

        const response = await request(app)
            .get(`/api/users/${requestedUserId}`)
            .set('Authorization', `Bearer ${jwtToken}`);

        expect(response.statusCode).toBe(404);
    });

    test('should return 401, if user is not authenticated', async () => {
        const requestedUserId = testData.users[1]._id;

        const response = await request(app).get(`/api/users/${requestedUserId}`);

        expect(response.statusCode).toBe(401);
    });

    test('should return 400, if user id is not a valid id', async () => {
        const requestedUserId = '12345';
        const userId = testData.users[0]._id;
        const jwtToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET);

        const response = await request(app)
            .get(`/api/users/${requestedUserId}`)
            .set('Authorization', `Bearer ${jwtToken}`);

        expect(response.statusCode).toBe(400);
    });
});
