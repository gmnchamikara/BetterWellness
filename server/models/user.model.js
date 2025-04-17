// models/user.model.js
import { v4 as uuidv4 } from "uuid";
import { ddbDocClient } from "../config/db.js";
import { GetCommand, PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";

const TABLE_NAME = "Users";

// Create User
export const createUser = async (userData) => {
  const now = new Date().toISOString();
  const userItem = {
    userId: uuidv4(), // primary key
    fullname: userData.fullname,
    email: userData.email,
    phone: userData.phone,
    password: userData.password,
    profilePicture:
      userData.profilePicture ??
      "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
    createdAt: now,
    updatedAt: now,
  };

  const command = new PutCommand({
    TableName: TABLE_NAME,
    Item: userItem,
    ConditionExpression: "attribute_not_exists(email)", // prevents overwrite
  });

  try {
    await ddbDocClient.send(command);
    return userItem;
  } catch (err) {
    throw new Error("DynamoDB Error - Create User: " + err.message);
  }
};

// Get User by Email (requires GSI on 'email')
export const getUserByEmail = async (email) => {
  const command = new QueryCommand({
    TableName: TABLE_NAME,
    IndexName: "email-index", // You must define this GSI in DynamoDB
    KeyConditionExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": email,
    },
  });

  try {
    const result = await ddbDocClient.send(command);
    return result.Items?.[0] || null;
  } catch (err) {
    throw new Error("DynamoDB Error - Get User: " + err.message);
  }
};

// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     fullname: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     phone: {
//       type: Number,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     profilePicture: {
//       type: String,
//       default:
//         "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
//     },
//   },
//   { timestamps: true }
// );

// const User = mongoose.model("User", userSchema);

// export default User;
