// config/db.js
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import dotenv from "dotenv";

dotenv.config();

let ddbClient; // Low-level client
let ddbDocClient; // Document client

const connectDB = async () => {
  try {
    ddbClient = new DynamoDBClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

    // Ensure credentials are loaded
    console.log("🔄 Connecting to AWS DynamoDB...");
    await ddbClient.config.credentials();
    console.log("✅ DynamoDB Client initialized successfully");
  } catch (error) {
    console.error("❌ DynamoDB connection failed:", error.message);
    process.exit(1);
  }
};

const getDynamoClient = () => {
  if (!ddbDocClient || !ddbClient) {
    throw new Error(
      "DynamoDB clients not initialized. Call connectDB() first."
    );
  }
  return {
    ddbClient,
    ddbDocClient,
  };
};

export { connectDB, getDynamoClient, ddbClient, ddbDocClient };
