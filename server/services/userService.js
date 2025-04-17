// services/userService.js
import { v4 as uuidv4 } from "uuid";
import { ddbDocClient } from "../config/db.js";
import {
  GetCommand,
  PutCommand,
  QueryCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import { ensureUserTableExists } from "../utils/ensureUsersTable.js";

const TABLE_NAME = "Users";

// Create User
// Create User
export const createUser = async (userData) => {
  await ensureUserTableExists();

  const now = new Date().toISOString();
  const userItem = {
    userId: uuidv4(),
    fullname: userData.fullname,
    email: userData.email,
    phone: userData.phone,
    password: userData.password,
    profilePicture:
      userData.profilePicture ??
      "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
    role: userData.role ?? "client", // default role is 'client'
    disorder: userData.disorder ?? [], // default empty array
    createdAt: now,
    updatedAt: now,
  };

  const command = new PutCommand({
    TableName: TABLE_NAME,
    Item: userItem,
    ConditionExpression: "attribute_not_exists(email)",
  });

  try {
    await ddbDocClient.send(command);
    return userItem;
  } catch (err) {
    throw new Error("DynamoDB Error - Create User: " + err.message);
  }
};


// Get User by Email
export const getUserByEmail = async (email) => {
  await ensureUserTableExists();

  const command = new QueryCommand({
    TableName: TABLE_NAME,
    IndexName: "email-index",
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

// Update User by Email
export const updateUserByEmail = async (email, updatedData) => {
  await ensureUserTableExists();

  const user = await getUserByEmail(email);
  if (!user || !user.userId) {
    throw new Error("User not found");
  }

  const now = new Date().toISOString();
  const updatedItem = {
    ...user,
    ...updatedData,
    updatedAt: now,
  };

  const command = new PutCommand({
    TableName: TABLE_NAME,
    Item: updatedItem,
  });

  try {
    await ddbDocClient.send(command);
    return updatedItem;
  } catch (err) {
    throw new Error("DynamoDB Error - Update User: " + err.message);
  }
};

// Delete User by Email
export const deleteUserByEmail = async (email) => {
  await ensureUserTableExists();

  const user = await getUserByEmail(email);
  if (!user || !user.userId) {
    throw new Error("User not found");
  }

  const command = new DeleteCommand({
    TableName: TABLE_NAME,
    Key: {
      userId: user.userId,
    },
  });

  try {
    await ddbDocClient.send(command);
  } catch (err) {
    throw new Error("DynamoDB Error - Delete User: " + err.message);
  }
};
