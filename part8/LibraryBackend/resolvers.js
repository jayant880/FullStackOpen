const data = require('./data');

const getBooksByAuthor = (authorName) => {
    return data.books.filter((book) => book.author === authorName);
};

const getAuthorByName = (name) => {
    return data.authors.find((author) => author.name === name);
};

const resolvers = {
    Query: {
        bookCount: () => data.books.length,
        authorCount: () => data.authors.length,
        allBooks: (root, args) => {
            let filteredBooks = data.books;

            if (args.author) {
                filteredBooks = filteredBooks.filter(
                    (book) => book.author === args.author
                );
            }

            if (args.genre) {
                filteredBooks = filteredBooks.filter((book) =>
                    book.genres.includes(args.genre)
                );
            }

            return filteredBooks;
        },
        allAuthors: () => {
            return data.authors.map((author) => ({
                ...author,
                bookCount: getBooksByAuthor(author.name).length,
            }));
        },
    },
    Mutation: {
        addBook: (root, args) => {
            const newBook = {
                ...args,
                id: crypto.randomUUID(),
            };

            data.books = data.books.concat(newBook);

            const authorExists = data.authors.some(
                (author) => author.name === args.author
            );

            if (!authorExists) {
                const newAuthor = {
                    name: args.author,
                    id: crypto.randomUUID(),
                };
                data.authors = data.authors.concat(newAuthor);
            }

            return newBook;
        },
        editAuthor: (root, args) => {
            const author = getAuthorByName(args.name);

            if (!author) {
                return null;
            }

            const updatedAuthor = {
                ...author,
                born: args.setBornTo,
            };

            data.authors = data.authors.map((a) =>
                a.name === args.name ? updatedAuthor : a
            );

            return updatedAuthor;
        },
    },
};

module.exports = { resolvers };