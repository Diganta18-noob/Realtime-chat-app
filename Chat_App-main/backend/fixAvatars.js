// Usage: node backend/fixAvatars.js
// Fixes all users with broken avatar URLs (iran.liara.run) to use ui-avatars.com
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(__dirname, ".env") });

import mongoose from "mongoose";
import User from "./models/user.model.js";

await mongoose.connect(process.env.MongoDB_URI);

const users = await User.find({
  profilePic: { $regex: /iran\.liara\.run|^$/ }
});

console.log(`Found ${users.length} users with broken avatars.`);

for (const user of users) {
  user.profilePic = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=random`;
  await user.save();
  console.log(`  ✅ Fixed avatar for "${user.username}"`);
}

console.log("Done!");
await mongoose.disconnect();
process.exit(0);
