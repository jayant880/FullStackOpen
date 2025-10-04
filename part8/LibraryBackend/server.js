const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');
const { mongoose } = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
console.log(`connecting to ${MONGODB_URI}`);

mongoose.connect(MONGODB_URI)
    .then(() => console.log('connected to MongoDB'))
    .catch(error => console.log('error connecting to MongoDB:', error.message));

const server = new ApolloServer({
    typeDefs,
    resolvers
});

const startServer = async () => {
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    });
    console.log(`Server ready at ${url}`)
}

startServer();