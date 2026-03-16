// config.js — MUST be imported before any module that reads process.env
// This module resolves .env relative to the project root (Chat_App-main/)
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(__dirname, ".env") });

export default __dirname;
