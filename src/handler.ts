// import { ApolloServer, gql } from "apollo-server-lambda";
import * as Query from "./query";
import * as Mutation from "./mutation";

import * as AWS from "aws-sdk";
const tableName = "KyawBlogTable";
const dynamo = new AWS.DynamoDB.DocumentClient();

const { ApolloServer, gql } = require("apollo-server-lambda");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Post {
    id: Int
    title: String
    body: String
  }

  type Query {
    posts: [Post]
    post(id: Int): Post
  }

  type Mutation {
    addPost(id: Int, title: String, body: String): Post
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    ...Query,
    posts: async () => {
      const result = await dynamo.scan({
        TableName: tableName,
      }).promise();
      console.log("result :", result);
      return result;
    },
  },
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
