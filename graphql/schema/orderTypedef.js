// const { gql } = require('graphql-tag');

// const typedef=`#graphql
//   type Order {
//     id: ID!
//     user_id:ID
//     product_id:ID
//     quantity: Int!
//   }

//     type Query {
//     orders: [Order!]
//   }

//   type Mutation {
//     createOrder(id: Int!, quantity: Int!): Order!
//   }
// `;

// module.exports=typedef;

const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Order {
    userId: ID!
    productId: ID!
    quantity: Int!
  }

  type Query {
    orders: [Order]
  }

  type Mutation {
    createOrder(userId: ID!, productId: ID!, quantity: Int!): Order
  }
`;

module.exports = typeDefs;
