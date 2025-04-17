import dotenv from "dotenv";
import app from "./app.js";
//import connectDB from "./config/db.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

// Connect to DB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`
\u001b[32m===============================
🚀 Server is up and running!
📡 Listening on port: \u001b[36m${PORT}\u001b[0m
📅 Started at: \u001b[35m${new Date().toLocaleString()}\u001b[0m
===============================\u001b[0m
`);
  });
});
