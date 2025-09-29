const { test, describe, beforeEach, after } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');

const api = supertest(app);

const initialUsers = [
    {
        username: 'firstuser',
        name: "First User",
        password: "password123",
    },
    {
        username: 'seconduser',
        name: "Second User",
        password: "password123",
    },
    {
        username: 'Jayant',
        name: 'Jayant kumar singh',
        password: 'Password'
    }
]

beforeEach(async () => {
    await User.deleteMany({});
    for (let user of initialUsers) {
        const userObject = new User(user);
        await userObject.save();
    }
})

describe('user creation', () => {
    test('succeeds with valid data', async () => {
        const newUser = {
            username: 'hellas',
            name: 'Arto Hellas',
            password: 'secret123'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const usersAtEnd = await User.find({});
        assert.strictEqual(usersAtEnd.length, initialUsers.length + 1);

        const usernames = usersAtEnd.map(u => u.username);
        assert.strictEqual(usernames.includes('hellas'), true);
    });

    test('fails with proper statuscode if username already taken', async () => {
        const newUser = {
            username: 'firstuser',
            name: 'Duplicate User',
            password: 'password123'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        assert.strictEqual(result.body.error.includes('unique'), true)

        const usersAtEnd = await User.find({});
        assert.strictEqual(usersAtEnd.length, initialUsers.length);
    });

    test('fails with proper statuscode if username is too short', async () => {
        const newUser = {
            username: 'ab',
            name: 'Short Username',
            password: 'password123'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        assert.strictEqual(result.body.error.includes('3 characters'), true);

    });
    test('fails with proper statuscode if password is too short', async () => {
        const newUser = {
            username: 'validuser',
            name: 'Valid User',
            password: 'pw'
        };

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400);

        assert.strictEqual(result.body.error.includes('3 characters'), true);
    });

    test('fails with proper statuscode if username is missing', async () => {
        const newUser = {
            name: 'No Username',
            password: 'password123'
        };

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400);
    });

    test('fails with proper statuscode if password is missing', async () => {
        const newUser = {
            username: 'nopassword',
            name: 'No Password'
        };

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400);
    });
});

describe('when there are initially some users saved', () => {
    test('users are returned as json', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('all users are returned', async () => {
        const response = await api.get('/api/users');
        assert.strictEqual(response.body.length, initialUsers.length);
    });

    test('password hash is not returned', async () => {
        const response = await api.get('/api/users');
        const user = response.body[0];
        assert.strictEqual(user.password, undefined);
    });
});

after(async () => {
    await mongoose.connection.close();
});