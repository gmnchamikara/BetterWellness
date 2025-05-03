// utils/ensureTable.js
import {
  CreateTableCommand,
  DescribeTableCommand,
} from "@aws-sdk/client-dynamodb";
import { ddbClient } from "../config/db.js";

const TABLE_NAME = "Users";

export const ensureUserTableExists = async () => {
  try {
    await ddbClient.send(new DescribeTableCommand({ TableName: TABLE_NAME }));
  } catch (error) {
    if (error.name === "ResourceNotFoundException") {
      const params = {
        TableName: TABLE_NAME,
        KeySchema: [{ AttributeName: "userId", KeyType: "HASH" }],
        AttributeDefinitions: [
          { AttributeName: "userId", AttributeType: "S" },
          { AttributeName: "email", AttributeType: "S" },
        ],
        GlobalSecondaryIndexes: [
          {
            IndexName: "email-index",
            KeySchema: [{ AttributeName: "email", KeyType: "HASH" }],
            Projection: { ProjectionType: "ALL" },
            ProvisionedThroughput: {
              ReadCapacityUnits: 5,
              WriteCapacityUnits: 5,
            },
          },
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5,
        },
      };

      await ddbClient.send(new CreateTableCommand(params));
      console.log(`DynamoDB: Table '${TABLE_NAME}' is being created...`);
    } else {
      throw error;
    }
  }
};
