const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
  }
      
  input LoginInput {
      email: String!
      password: String!
  }
  
   type AuthPayload {
     token: String!
     user: User!
   }
   type Mutation {
    register(name: String!, email: String!, password: String!): User!
    login(email: String!, password: String!): AuthPayload!
   }
 `;
module.exports = typeDefs;
