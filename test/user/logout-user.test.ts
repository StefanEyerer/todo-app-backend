import jwt from 'jsonwebtoken';
import request from 'supertest';
import app from '../../src/app';
import testData from '../test-data.json';
import { ConnectionInfo, connectToDatabase, disconnectFromDatabase, populateDatabase } from '../test-utils';

describe('Endpoint POST /user/logout', () => {
    let connectionInfo: ConnectionInfo;

    beforeAll(async () => {
        connectionInfo = await connectToDatabase();
        await populateDatabase();
    });

    afterAll(async () => {
        await disconnectFromDatabase(connectionInfo);
    });

    test('should return 204, if logout is successful', async () => {
        const userId = testData.users[0]._id;
        const jwtToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET);

        const response = await request(app)
            .post('/api/user/logout')
            .send({ refreshToken: jwtToken })
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(204);
    });

    test('should return 400, if no refresh token is provided', async () => {
        const response = await request(app).post('/api/user/logout').send({}).set('Accept', 'application/json');

        expect(response.statusCode).toBe(400);
    });
});
