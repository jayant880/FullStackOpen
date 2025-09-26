const { test, describe, beforeEach, after } = require('node:test');
const assert = require('node:assert');
const mongooes = require('mongoose');
const supertest = require('supertest');
const app = require("../app");
const Blog = require('../model/blog');

const api = supertest(app);

test('blog are returned as json', async () => {
    await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');
    assert.strictEqual(response.body.length, 2);
})