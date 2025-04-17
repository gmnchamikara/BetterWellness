// config/db.js
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import dotenv from "dotenv";

dotenv.config();

let ddbDocClient;

const connectDB = async () => {
  try {
    const client = new DynamoDBClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    ddbDocClient = DynamoDBDocumentClient.from(client);

    // Attempt to resolve credentials
    console.log("🔄 Connecting to AWS DynamoDB...");
    await client.config.credentials(); // ensures credentials are resolved
    console.log("✅ DynamoDB Client initialized successfully");
  } catch (error) {
    console.error("❌ DynamoDB connection failed:", error.message);
    process.exit(1);
  }
};

const getDynamoClient = () => {
  if (!ddbDocClient) {
    throw new Error("DynamoDB DocumentClient not initialized. Call connectDB() first.");
  }
  return ddbDocClient;
};

export { connectDB, getDynamoClient, ddbDocClient };


// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO);
//     console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error("❌ MongoDB connection failed:", error.message);
//     process.exit(1);
//   }
// };

// export default connectDB;
