import dotenv from "dotenv";
import mongoose from "mongoose";
import { signup } from "./controllers/auth.controller.js";

dotenv.config();

mongoose.connect(process.env.MONGO_DB_URI).then(async () => {
  const req = {
    body: {
      fullName: "Test User",
      username: "test990",
      password: "password123",
      confirmPassword: "password123",
      gender: "male"
    },
    ip: "127.0.0.1",
    headers: { "user-agent": "test-agent" }
  };
  const res = {
    status: (s) => ({ json: (d) => console.log("STATUS", s, "DATA", d) }),
    cookie: (n, v, o) => console.log("Set Cookie", n)
  };

  try {
    await signup(req, res);
  } catch (e) {
    console.error("Uncaught error:", e);
  } finally {
    process.exit(0);
  }
}).catch(console.error);
