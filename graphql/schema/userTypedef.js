
const { gql } = require('graphql-tag');

const userTypeDef = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User]
    user(email: String!): User
  }

`;

module.exports = userTypeDef;
