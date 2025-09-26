const { test, describe, beforeEach, after } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require("../app");
const Blog = require('../model/blog');
const { blogsInDb } = require('../utils/test_helper');
const { info } = require('../utils/logger');

const api = supertest(app);

test('blog are returned as json', async () => {
    await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');
    assert.strictEqual(response.body.length, 2);
})

test('unique identifier property of blog posts is named id', async () => {
    const response = await api.get('/api/blogs');
    const blog = response.body[0];
    assert.strictEqual(blog.id !== undefined, true);
    assert.strictEqual(blog._id, undefined);
});

describe('addition of new blog', () => {
    test('succeeds with valid data', async () => {
        const newBlog = {
            title: 'Test Driven Development',
            author: 'Tester',
            url: 'http://test.helper.com',
            likes: 100
        };
        await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/);

        const blogAtEnd = await blogsInDb();
        assert.strictEqual(blogAtEnd.length, 3);

        const titles = blogAtEnd.map(b => b.title);
        assert.strictEqual(titles.includes('Test Driven Development'), true);
    })
})

after(async () => {
    await mongoose.connection.close();
})