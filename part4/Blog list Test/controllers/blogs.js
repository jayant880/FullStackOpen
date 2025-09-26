const blogRouter = require('express').Router();
const Blog = require('../model/blog');

blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({});
    res.json(blogs);
})

blogRouter.post('/', async (req, res) => {
    const body = req.body;

    if (!body.title || !body.url) {
        return res.status(400).json({ error: 'Title and URL is required' });
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0
    });

    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
})

module.exports = blogRouter;