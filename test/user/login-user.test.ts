import request from 'supertest';
import app from '../../src/app';
import testData from '../test-data.json';
import { ConnectionInfo, connectToDatabase, disconnectFromDatabase, populateDatabase } from '../test-utils';

describe('Endpoint POST /user/login', () => {
    let connectionInfo: ConnectionInfo;

    beforeAll(async () => {
        connectionInfo = await connectToDatabase();
        await populateDatabase();
    });

    afterAll(async () => {
        await disconnectFromDatabase(connectionInfo);
    });

    test('should return 200, if login data is correct', async () => {
        const username = testData.users[0].username;
        const password = testData.users[0].password;

        const response = await request(app)
            .post('/api/user/login')
            .send({ username, password })
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        expect(response.body.accessToken).toBeDefined();
        expect(response.body.refreshToken).toBeDefined();
    });

    test('should return 400, if login data is not correct', async () => {
        const username = testData.users[0].username;
        const password = 'someWrongPassword';

        const response = await request(app)
            .post('/api/user/login')
            .send({ username, password })
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(400);
    });

    test('should return 400, if only username is provided', async () => {
        const username = testData.users[0].username;

        const response = await request(app)
            .post('/api/user/login')
            .send({ username })
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(400);
    });

    test('should return 400, if only password is provided', async () => {
        const password = testData.users[0].password;

        const response = await request(app)
            .post('/api/user/login')
            .send({ password })
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(400);
    });
});
