const { test, describe, beforeEach, after } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
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

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await Blog.find({});
        const blogToDelete = blogsAtStart[0];

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204);

        const blogsAtEnd = await Blog.find({});
        assert.strictEqual(blogsAtEnd.length, initialBlogs.length - 1);

        const titles = blogsAtEnd.map(blog => blog.title);
        assert.strictEqual(titles.includes(blogToDelete.title), false);
    });

    test('fails with status code 404 if blog does not exist', async () => {
        const validNonexistingId = new mongoose.Types.ObjectId().toString();

        await api
            .delete(`/api/blogs/${validNonexistingId}`)
            .expect(404);
    });

    test('fails with status code 400 if id is invalid', async () => {
        const invalidId = 'invalid-id-format';

        await api
            .delete(`/api/blogs/${invalidId}`)
            .expect(400);
    });
});

describe('updating a blog', () => {
    test('succeeds with valid data', async () => {
        const blogsAtStart = await Blog.find({});
        const blogToUpdate = blogsAtStart[0];

        const updatedBlogData = {
            title: 'Updated Blog title',
            author: 'Updated Author',
            url: 'http://updatedUrl.com',
            likes: 10101,
        }

        const res = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updatedBlogData)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(res.body.title, updatedBlogData.title);
        assert.strictEqual(res.body.author, updatedBlogData.author);
        assert.strictEqual(res.body.url, updatedBlogData.url);
        assert.strictEqual(res.body.likes, updatedBlogData.likes);
        assert.strictEqual(res.body.id, blogToUpdate.id);
    })

    test('updating only likes succeeds', async () => {
        const blogsAtStart = await Blog.find({});
        const blogToUpdate = blogsAtStart[0];

        const updatedLikes = {
            title: blogToUpdate.title,
            author: blogToUpdate.author,
            url: blogToUpdate.url,
            likes: 50
        };

        const response = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updatedLikes)
            .expect(200);

        assert.strictEqual(response.body.likes, updatedLikes.likes);
        assert.strictEqual(response.body.title, blogToUpdate.title);
        assert.strictEqual(response.body.author, blogToUpdate.author);
        assert.strictEqual(response.body.url, blogToUpdate.url);
    });

    test('fails with status code 400 if required fields are missing', async () => {
        const blogsAtStart = await Blog.find({});
        const blogToUpdate = blogsAtStart[0];

        const invalidBlogData = {
            author: 'Only Author Provided'
        };

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(invalidBlogData)
            .expect(400);
    });

    test('fails with status code 404 if blog does not exist', async () => {
        const validNonexistingId = new mongoose.Types.ObjectId().toString();

        const updatedBlogData = {
            title: 'Non-existent Blog',
            author: 'Ghost Author',
            url: 'http://ghost.com',
            likes: 1
        };

        await api
            .put(`/api/blogs/${validNonexistingId}`)
            .send(updatedBlogData)
            .expect(404);
    });

    test('fails with status code 400 if id is invalid', async () => {
        const invalidId = 'invalid-id-format';

        const updatedBlogData = {
            title: 'Test Blog',
            author: 'Test Author',
            url: 'http://test.com',
            likes: 1
        };

        await api
            .put(`/api/blogs/${invalidId}`)
            .send(updatedBlogData)
            .expect(400);
    });
})

after(async () => {
    await mongoose.connection.close();
})