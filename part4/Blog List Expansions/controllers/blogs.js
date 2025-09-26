const blogRouter = require('express').Router();
const Blog = require('../model/blog');

blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({});
    res.json(blogs);
})

blogRouter.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
        res.json(blog);
    } else {
        res.status(404).end();
    }
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

blogRouter.delete('/:id', async (req, res) => {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog)
        return res.status(404).json({ error: 'Blog not found' });

    res.status(204).end();
})

module.exports = blogRouter;