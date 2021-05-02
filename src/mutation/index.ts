import * as AWS from "aws-sdk";

const tableName = "BlogProjectStack-KyawBlogTable56C5D202-MC7WE2F3EC3S";
const dynamo = new AWS.DynamoDB.DocumentClient();

export const addPost = async (parent: any, args: any) => {
  const { id, title, body } = args;
  try {
    await dynamo
      .put({
        TableName: tableName,
        Item: {
          id,
          title,
          body,
        },
      })
      .promise();
    return { id, title, body };
  } catch (error) {
    return {
      id: 1,
      title: "Cannot add data",
      body: JSON.stringify(error),
    };
  }
};

export const updatePost = async (parent: any, args: any) => {
  const { id, title, body } = args;
  try {
    const response = await dynamo
      .put({
        TableName: tableName,
        Item: {
          id,
          title,
          body,
        },
      })
      .promise();
    return response.$response.data;
  } catch (error) {
    return {
      id: "ASDFER",
      title: "Cannot delete data",
      body: JSON.stringify(error),
    };
  }
};

export const deletePost = async (parent: any, args: any) => {
  const { id } = args;
  try {
    const response = await dynamo
      .delete({
        TableName: tableName,
        Key: {
          id,
        },
      })
      .promise();
    return response.$response.data;
  } catch (error) {
    return {
      id: "ASDFER",
      title: "Cannot delete data",
      body: JSON.stringify(error),
    };
  }
};
