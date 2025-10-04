const jwt = require('jsonwebtoken');
const { GraphQLError } = require('graphql');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const auth = {
    authenticate: context => {
        const auth = context.req ? context.req.headers.authorization : null;
        if (auth && auth.startsWith('bearer ')) {
            const token = auth.substring(7);
            try {
                return jwt.verify(token, JWT_SECRET);
            } catch (error) {
                throw new GraphQLError('Invalid Token', {
                    extensions: {
                        code: 'UNAUTHENTICATED'
                    }
                })
            }
        }
        return null
    },

    checkAuth: context => {
        const currentUser = auth.authenticate(context);
        if (!currentUser) throw new GraphQLError('Not authenticated', {
            extensions: {
                code: 'UNAUTHENTICATED'
            }
        })
    }
};

module.exports = auth;