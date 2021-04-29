import * as AWS from "aws-sdk";
import { POSTS } from "../mockdata";

const tableName = "KyawBlogTable";
const dynamo = new AWS.DynamoDB.DocumentClient();

export const posts = async () => {
  const result = await dynamo.scan({
    TableName: tableName,
  });
  return result;
};

// TODO: to replace any types
export const post = (parent: any, args: any) => {
  const { id } = args;
  const post = POSTS.filter((post) => post.id === id)[0];
  return post;
};
