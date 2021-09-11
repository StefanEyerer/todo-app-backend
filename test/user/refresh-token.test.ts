import jwt from 'jsonwebtoken';
import request from 'supertest';
import app from '../../src/app';
import testData from '../test-data.json';
import { ConnectionInfo, connectToDatabase, disconnectFromDatabase, populateDatabase } from '../test-utils';

describe('Endpoint POST /user/token/refresh', () => {
    let connectionInfo: ConnectionInfo;

    beforeAll(async () => {
        connectionInfo = await connectToDatabase();
        await populateDatabase();
    });

    afterAll(async () => {
        await disconnectFromDatabase(connectionInfo);
    });

    test('should return 200, if refresh token is valid', async () => {
        const username = testData.users[0].username;
        const password = testData.users[0].password;
        const loginResponse = await request(app)
            .post('/api/user/login')
            .send({ username, password })
            .set('Accept', 'application/json');

        const refreshToken = loginResponse.body.refreshToken;

        const response = await request(app)
            .post('/api/user/token/refresh')
            .send({ refreshToken })
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        expect(response.body.accessToken).toBeDefined();
        expect(response.body.refreshToken).toBeDefined();
    });

    test('should return 401, if refresh token is not valid', async () => {
        const jwtToken = jwt.sign({ someData: 'someData' }, 'wrongSecret');

        const response = await request(app)
            .post('/api/user/token/refresh')
            .send({ refreshToken: jwtToken })
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(401);
    });

    test('should return 400, if no refresh token is provided', async () => {
        const response = await request(app).post('/api/user/token/refresh').send({}).set('Accept', 'application/json');

        expect(response.statusCode).toBe(400);
    });
});
