// Usage: node backend/seedAdmin.js <username> [password]
// Promotes an existing user to admin role, or creates a new admin if not found.
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Load .env from project root (Chat_App-main/)
const __dirname = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(__dirname, ".env") });

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/user.model.js";

const username = process.argv[2] || "admin";
const password = process.argv[3] || "admin123";

await mongoose.connect(process.env.MongoDB_URI);

const existing = await User.findOne({ username });
if (existing) {
  existing.role = "admin";
  await existing.save();
  console.log(`✅ User "${username}" promoted to admin.`);
} else {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  await User.create({
    fullName: "Administrator",
    username,
    password: hashedPassword,
    gender: "male",
    profilePic: `https://ui-avatars.com/api/?name=${username}&background=random`,
    role: "admin",
  });
  console.log(`✅ Admin user created — username: "${username}", password: "${password}"`);
}

await mongoose.disconnect();
process.exit(0);
