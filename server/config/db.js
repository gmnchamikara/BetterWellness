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


// config/db.js
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

let ddbDocClient;

const connectDB = async () => {
  try {
    const client = new DynamoDBClient({ region: process.env.AWS_REGION });
    ddbDocClient = DynamoDBDocumentClient.from(client);

    // Test a dummy operation to validate connection
    console.log("🔄 Connecting to AWS DynamoDB...");
    await client.config.credentials(); // Ensures credentials are resolved
    console.log("✅ DynamoDB Client initialized successfully");
  } catch (error) {
    console.error("❌ DynamoDB connection failed:", error.message);
    process.exit(1);
  }
};

export { connectDB, ddbDocClient };
