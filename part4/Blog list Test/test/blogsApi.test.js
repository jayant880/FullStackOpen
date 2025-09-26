const { test, describe, beforeEach, after } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../model/blog');
const config = require('../utils/config');

const api = supertest(app);

const initialBlogs = [
    {
        title: 'First Blog',
        author: 'John Doe',
        url: 'http://firstblog.com',
        likes: 5
    },
    {
        title: 'Second Blog',
        author: 'Jane Smith',
        url: 'http://secondblog.com',
        likes: 10
    }
]

beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(initialBlogs);
})

describe('when there are initially some blogs saved', () => {
    test('blogs are returned as json', async () => {
        await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/);
    });

    test('all blogs are returned', async () => {
        const res = await api.get('/api/blogs');
        assert.strictEqual(res.body.length, initialBlogs.length);
    })

    test('unique identifier property of blog posts is named id', async () => {
        const res = await api.get('/api/blogs');
        const blog = res.body[0];
        assert.strictEqual(blog.id !== undefined, true);
        assert.strictEqual(blog._id, undefined);
    });
})

describe('addition of new blog', () => {
    test('succeeds with valid data', async () => {
        const newBlog = {
            title: 'Test Driven Development',
            author: 'Tester',
            url: 'http://test.helper.com',
            likes: 100
        };
        await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/);

        const res = await api.get('/api/blogs')
        assert.strictEqual(res.body.length, initialBlogs.length + 1);

        const titles = res.body.map(b => b.title);
        assert.strictEqual(titles.includes('Test Driven Development'), true);
    });

    test('defaults likes to 0 if missing from request', async () => {
        const newBlog = {
            title: 'Blog without likes',
            author: 'Test Author',
            url: 'http://test.com',
        };

        const res = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)


        assert.strictEqual(res.body.likes, 0);
    });

    test('fails with status code 400 if title is missing', async () => {
        const newBlog = {
            author: 'Tester',
            url: 'http://test.this.com',
            likes: 1
        };

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    });

    test('fails with status code 400 if url is missing', async () => {
        const newBlog = {
            title: 'No URL Blog',
            author: 'Anonymous',
            likes: 1
        };

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400);
    });
})

after(async () => {
    await mongoose.connection.close();
})