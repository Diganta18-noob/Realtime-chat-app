import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import path from "path";

dotenv.config({ path: path.resolve(".env") });

// A minimal script to create/reset the users
async function seed() {
  await mongoose.connect(process.env.MongoDB_URI || 'mongodb://localhost:27017/chat-app');
  
  const db = mongoose.connection.db;
  
  // We don't have the mongoose model required easily, let's just use raw collection
  const users = db.collection('users');

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash("admin123", salt);
  const userPassword = await bcrypt.hash("user123", salt);

  await users.updateOne(
    { username: "admin" },
    { $set: { 
        fullName: "System Admin", 
        password: hashedPassword,
        gender: "male",
        profilePic: "",
        role: "admin"
      } 
    },
    { upsert: true }
  );

  await users.updateOne(
    { username: "testuser" },
    { $set: { 
        fullName: "Test User", 
        password: userPassword,
        gender: "male",
        profilePic: "",
        role: "user"
      } 
    },
    { upsert: true }
  );

  console.log("Credentials set!");
  console.log("Admin => admin / admin123");
  console.log("User => testuser / user123");

  process.exit(0);
}

seed().catch(console.dir);
