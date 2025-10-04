const Book = require('./models/Book');
const Author = require('./models/Author');
const { GraphQLError } = require('graphql');

const resolvers = {
    Query: {
        bookCount: async () => await Book.countDocuments(),
        authorCount: async () => await Author.countDocuments(),
        allAuthors: async () => await Author.find({}),
        allBooks: async (root, args) => {
            let query = {};

            if (args.author) {
                const author = await Author.find({ name: args.author })
                if (author) query.author = author._id;
            } else return [];

            if (args.genre) query.genres = { $in: [args.genre] };

            return Book.find(query).populate('author');
        },
    },
    Mutation: {
        addBook: async (root, args) => {
            let author = await Author.find({ name: args.author });
            if (!author) {
                author = new Author({ name: args.author });

                try {
                    await author.save();
                } catch (error) {
                    throw new GraphQLError('Creating Author failed', {
                        extensions: 'BAD_USER_INPUT',
                        invalidArgs: args.author,
                        error: error.message
                    })
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
                })
            }

            return book.populate('author');
        },
        editAuthor: async (root, args) => {
            const author = await Author.find({ name: args.name });
            if (!author) return null;

            author.born = args.setBornTol

            try {
                await author.save();
            } catch (error) {
                throw new GraphQLError('Editing author failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error: error.message
                    }
                })
            }

            return author
        }
    },

    Author: {
        bookCount: async (root) => await Book.countDocuments({ author: root._id })
    }
};

module.exports = { resolvers };