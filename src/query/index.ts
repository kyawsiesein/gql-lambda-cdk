import * as AWS from "aws-sdk";
import { POSTS } from "../mockdata";

const tableName = "BlogProjectStack-KyawBlogTable56C5D202-MC7WE2F3EC3S";
const dynamo = new AWS.DynamoDB.DocumentClient();

export const posts = async () => {
  const result = await dynamo
    .scan({
      TableName: tableName,
    })
    .promise();
  return result.Items;
};

// TODO: to replace any types
export const post = async (parent: any, args: any) => {
  try {
    const { id } = args;
    const response = await dynamo
      .get({
        TableName: tableName,
        Key: { id },
      })
      .promise();
    return response.Item;
  } catch (error) {
    return {
      id: "asdfhajdf",
      title: "Cannot retrieve an item",
      body: JSON.stringify(error),
    };
  }
};
