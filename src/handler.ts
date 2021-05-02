// import { ApolloServer, gql } from "apollo-server-lambda";
import * as Query from "./query";
import * as Mutation from "./mutation";

const { ApolloServer, gql } = require("apollo-server-lambda");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Post {
    id: String
    title: String
    body: String
  }

  type Query {
    posts: [Post]
    post(id: String): Post
  }

  type Mutation {
    addPost(id: String, title: String, body: String): Post
    deletePost(id: String): Post
    updatePost(id: String, title: String, body: String): Post
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query,
  Mutation,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: "/prod/graphql",
  },
  introspection: true,
});

export const handler = server.createHandler();
