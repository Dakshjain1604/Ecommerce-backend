// graphql/resolvers/index.js
const productResolver = require('./productResolver');
const userResolver = require('./userResolver');
const orderResolver = require('./orderResolver');
const authResolver=require('./authResolver')

module.exports = {
  Query: {
    ...productResolver.Query,
    ...userResolver.Query,
    ...orderResolver.Query,
    ...authResolver.Query
  },
  Mutation: {
    ...productResolver.Mutation,
    ...userResolver.Mutation,
    ...orderResolver.Mutation,
    ...authResolver.Mutation
  },
};

