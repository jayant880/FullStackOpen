const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
    res.json(blogs);
})

blogRouter.post('/', async (req, res) => {
    const body = req.body;

    if (!body.title || !body.url) {
        return res.status(400).json({ error: 'Title and URL is required' });
    }

    const user = await User.findOne({});
    if (!user) {
        return res.status(400).json({ error: 'No users found' });
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0
    });

    try {
        const savedBlog = await blog.save();

        user.blog = user.blog.concat(savedBlog._id);
        await user.save();

        await savedBlog.populate('user', { username: 1, nam: 1 });

        res.status(201).json(savedBlog);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

blogRouter.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (blog) {
            res.json(blog);
        } else {
            res.status(404).end();
        }
    } catch (error) {
        res.status(400).json({ error: 'malformatted id' })
    }
})


blogRouter.delete('/:id', async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);

        if (!blog)
            return res.status(404).json({ error: 'Blog not found' });

        res.status(204).end();
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

blogRouter.put('/:id', async (req, res) => {
    const body = req.body;

    // Manual validation for required fields
    if (!body.title || !body.url) {
        return res.status(400).json({ error: 'Title and URL are required' });
    }

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0
    };

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            blog,
            { new: true, runValidators: true, context: 'query' }
        );
        if (!updatedBlog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        res.json(updatedBlog);
    } catch (error) {
        // FIX: Changed 'response' to 'res'
        if (error.name === 'CastError') {
            res.status(400).json({ error: 'malformatted id' });
        } else if (error.name === 'ValidationError') {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: error.message });
        }
    }
});

module.exports = blogRouter;