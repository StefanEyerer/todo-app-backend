import request from 'supertest';
import app from '../../src/app';
import testData from '../test-data.json';
import { ConnectionInfo, connectToDatabase, disconnectFromDatabase, populateDatabase } from '../test-utils';

describe('Endpoint POST /user/register', () => {
    let connectionInfo: ConnectionInfo;

    beforeAll(async () => {
        connectionInfo = await connectToDatabase();
        await populateDatabase();
    });

    afterAll(async () => {
        await disconnectFromDatabase(connectionInfo);
    });

    test('should return 201, if registration is successful', async () => {
        const email = 'john@doe.com';
        const username = 'JohnDoe';
        const password = 'secret';

        const response = await request(app)
            .post('/api/user/register')
            .send({ email, username, password })
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(201);
        expect(response.body.id).toBeDefined();
        expect(response.body.email).toBe(email);
        expect(response.body.username).toBe(username);
    });

    test('should return 409, if email is already taken', async () => {
        const email = testData.users[0].email;
        const username = 'JohnDoe';
        const password = 'secret';

        const response = await request(app)
            .post('/api/user/register')
            .send({ email, username, password })
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(409);
    });

    test('should return 409, if username is already taken', async () => {
        const email = 'john@doe.com';
        const username = testData.users[0].username;
        const password = 'secret';

        const response = await request(app)
            .post('/api/user/register')
            .send({ email, username, password })
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(409);
    });

    test('should return 400, if email is invalid', async () => {
        const email = 'notAnEmail';
        const username = 'JohnDoe';
        const password = 'secret';

        const response = await request(app)
            .post('/api/user/register')
            .send({ email, username, password })
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(400);
    });

    test('should return 400, if no email is provided', async () => {
        const username = 'JohnDoe';
        const password = 'secret';

        const response = await request(app)
            .post('/api/user/register')
            .send({ username, password })
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(400);
    });

    test('should return 400, if no username is provided', async () => {
        const email = 'john@doe.com';
        const password = 'secret';

        const response = await request(app)
            .post('/api/user/register')
            .send({ email, password })
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(400);
    });

    test('should return 400, if no password is provided', async () => {
        const email = 'john@doe.com';
        const username = 'JohnDoe';

        const response = await request(app)
            .post('/api/user/register')
            .send({ email, username })
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(400);
    });
});
