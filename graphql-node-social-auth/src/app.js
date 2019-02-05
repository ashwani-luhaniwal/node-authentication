require('./mongoose');
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolver');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    // add request and response to graphql context
    context: ({ req, res}) => ({ req, res })
});

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});