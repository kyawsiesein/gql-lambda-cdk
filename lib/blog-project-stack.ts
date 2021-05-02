// 1. What is the bare minimum in cdk.json
// 2. Why is it using docker and running cdk synth takes me 3 minutes?
// 3. using typescript needs to compile ts files and how can we do without running tsc?
// 4. changing playground endpoint from 'prod/graphql' to 'dev/graphlq' will not work or throw
// 403 forbidden error since the stage is not the same
// One way to fix it is to deploy api gateway to stage - dev first?
// eg. `https://n547xrnc81.execute-api.ap-southeast-2.amazonaws.com/dev/` instead of `https://n547xrnc81.execute-api.ap-southeast-2.amazonaws.com/prod/`

// 29 Apr 2021
// 1. How do we debug if there is any issues with the code or the errors in both gql and aws
// 2. global table vs normal table?
// 3. granting access to lambda

import * as cdk from "@aws-cdk/core";
import * as lambdaNodeJS from "@aws-cdk/aws-lambda-nodejs";
import * as apigateway from "@aws-cdk/aws-apigateway";
import * as dynamodb from "@aws-cdk/aws-dynamodb";

export class BlogProjectStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Creating lambda
    const gqlLambdaHandler = new lambdaNodeJS.NodejsFunction(
      this,
      "kyaw-blog-project-gql-lambda",
      {
        handler: "handler",
        entry: "./src/handler.ts",
      }
    );

    // Creating API Gateway with lambda
    new apigateway.LambdaRestApi(this, "kyaw-blog-project-gql-api", {
      handler: gqlLambdaHandler,
    });

    const blogTable = new dynamodb.Table(this, "KyawBlogTable", {
      partitionKey: {
        name: "id",
        type: dynamodb.AttributeType.STRING,
      },
    });

    blogTable.grantFullAccess(gqlLambdaHandler);
  }
}
