// const { gql } = require('graphql-tag');

// const productTypeDef = `#graphql
//   type Product {
//     id: ID!
//     name: String!
//     price: Float!
//     description: String
//   }

//   type Query {
//     products: [Product]
//     product(id: ID!): Product
//   }

//   type Mutation {
//     createProduct(name: String!, price: Float!, description: String): Product
//   }
// `;

// module.exports = productTypeDef;
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Product {
    name: String!
    description: String!
    price: Float!
    stock: Int!
  }

  type Query {
    products: [Product]
    product(id: ID!): Product
  }

  type Mutation {
    createProduct(name: String!, description: String, price: Float!, stock: Int!): Product
  }
`;

module.exports = typeDefs;
 