
// const express = require('express');
// const { graphqlHTTP } = require('express-graphql');
// const { makeExecutableSchema } = require('@graphql-tools/schema');
const typeDefs = require('./graphql/schema/schema');
const resolvers = require('./graphql/resolvers/resolvers');

// const schema = makeExecutableSchema({
//   typeDefs,
//   resolvers,
// });

// const app = express();

// app.use('/graphql', graphqlHTTP({
//   schema,
//   graphiql: true,
// }));
// import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';
// const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');


// const schema = new GraphQLSchema({
//   query: new GraphQLObjectType({
//         typeDefs,
//         resolvers
//       }),
//   });

// module.exports=schema;

const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');
const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => 'Hello, world!',
    },
  },
});
const schema = new GraphQLSchema({
  query: QueryType,
});
module.exports = schema;
