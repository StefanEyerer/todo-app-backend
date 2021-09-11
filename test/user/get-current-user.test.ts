import jwt from 'jsonwebtoken';
import request from 'supertest';
import app from '../../src/app';
import testData from '../test-data.json';
import { ConnectionInfo, connectToDatabase, disconnectFromDatabase, populateDatabase } from '../test-utils';

describe('Endpoint GET /user/profile', () => {
    let connectionInfo: ConnectionInfo;

    beforeAll(async () => {
        connectionInfo = await connectToDatabase();
        await populateDatabase();
    });

    afterAll(async () => {
        await disconnectFromDatabase(connectionInfo);
    });

    test('should return 200, if profile exists', async () => {
        const userId = testData.users[0]._id;
        const jwtToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET);

        const response = await request(app).get('/api/user/profile').set('Authorization', `Bearer ${jwtToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(userId);
    });

    test('should return 404, if profile does not exist', async () => {
        const userId = '609591021bbdb9595218aaaa';
        const jwtToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET);

        const response = await request(app).get('/api/user/profile').set('Authorization', `Bearer ${jwtToken}`);

        expect(response.statusCode).toBe(404);
    });

    test('should return 401, if user is not authenticated', async () => {
        const response = await request(app).get('/api/user/profile');

        expect(response.statusCode).toBe(401);
    });
});
