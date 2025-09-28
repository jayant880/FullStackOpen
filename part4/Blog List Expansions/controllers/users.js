const userRouter = require('express').Router();
const User = require('../models/user');
const bcryptjs = require('bcryptjs');

userRouter.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: 'error while getting user datadata' });
    }
});

userRouter.post('/', async (req, res) => {
    try {
        const { username, password, name } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username must be unique' });
        }

        if (!password || password.length < 3) {
            return res.status(400).json({
                error: 'Password must be at least 3 character long'
            });
        }
        const saltRound = 10
        const passwordHash = await bcryptjs.hash(password, saltRound);

        const user = new User({
            username, password: passwordHash, name
        });

        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

module.exports = userRouter;