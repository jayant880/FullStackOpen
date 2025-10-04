const Book = require('./models/Book');
const Author = require('./models/Author');
const { GraphQLError } = require('graphql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('./utils/auth');
const User = require('./models/User');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const resolvers = {
    Query: {
        bookCount: async () => await Book.countDocuments(),
        authorCount: async () => await Author.countDocuments(),
        allAuthors: async () => await Author.find({}),
        allBooks: async (root, args) => {
            let query = {};

            if (args.author) {
                const author = await Author.findOne({ name: args.author });
                if (author) {
                    query.author = author._id;
                } else {
                    return [];
                }
            }

            if (args.genre) {
                query.genres = { $in: [args.genre] };
            }

            return Book.find(query).populate('author');
        },
        me: async (root, args, context) => {
            const currentUser = auth.authenticate(context);
            if (!currentUser) return null;
            return User.findById(currentUser.id);
        }
    },
    Mutation: {
        addBook: async (root, args, context) => {
            const currentUser = auth.checkAuth(context);

            let author = await Author.findOne({ name: args.author });
            if (!author) {
                author = new Author({ name: args.author });

                try {
                    await author.save();
                } catch (error) {
                    throw new GraphQLError('Creating Author failed', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.author,
                            error: error.message
                        }
                    });
                }
            }

            const book = new Book({ ...args, author: author._id });

            try {
                await book.save();
            } catch (error) {
                throw new GraphQLError('Saving book failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.title,
                        error: error.message
                    }
                });
            }

            return book.populate('author');
        },
        editAuthor: async (root, args, context) => {
            const currentUser = auth.checkAuth(context);

            const author = await Author.findOne({ name: args.name });
            if (!author) {
                throw new GraphQLError('Author not found', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                    }
                });
            }

            author.born = args.setBornTo;

            try {
                await author.save();
            } catch (error) {
                throw new GraphQLError('Editing author failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.setBornTo,
                        error: error.message
                    }
                });
            }

            return author;
        },
        createUser: async (root, args) => {
            const passwordHash = await bcrypt.hash('secret', 10);

            const user = new User({
                username: args.username,
                favoriteGenre: args.favoriteGenre,
                passwordHash
            });

            try {
                await user.save();
            } catch (error) {
                throw new GraphQLError('Creating user failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.username,
                        error: error.message,
                    }
                });
            }
            return user;
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username });

            const passwordCorrect = user === null
                ? false
                : await bcrypt.compare(args.password, user.passwordHash);

            if (!(user && passwordCorrect)) {
                throw new GraphQLError('Wrong credentials', {
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                });
            }

            const userForToken = {
                username: user.username,
                id: user._id
            };

            return { value: jwt.sign(userForToken, JWT_SECRET) };
        }
    },
    Author: {
        bookCount: async (root) => await Book.countDocuments({ author: root._id })
    }
};

module.exports = { resolvers };