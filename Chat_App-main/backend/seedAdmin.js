// Usage: node backend/seedAdmin.js <username>
// Promotes an existing user to admin role, or creates a new admin if not found.
import "../config.js";
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
