import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import httpHeadersPlugin from 'apollo-server-plugin-http-headers'

import Queries from './resolvers/query.mjs'
import Mutations from './resolvers/mutations.mjs'
import typeDefs from './resolvers/types.mjs'

const resolvers = {
    Query: {
        ...Queries
    },
    Mutation: {
        ...Mutations
    },
};

const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    plugins: [httpHeadersPlugin],
    context: (data) => {
        return {
            headers: data.req.headers,
            setCookies: new Array(),
            setHeaders: new Array()
        };
    } 
});

const app = express();
﻿
server.start().then(res => {
    server.applyMiddleware({ app, path: '/graphql' });
    app.listen({ port: 4000 }, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
});