import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import bcrypt from 'bcryptjs';

dotenv.config({ path: path.resolve('.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY; 
const supabase = createClient(supabaseUrl, supabaseKey);

async function resetPasswords() {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash("password123", salt);

  // Update admin
  const { error: err1 } = await supabase
    .from('users')
    .update({ password: hashedPassword })
    .eq('username', 'admin');

  // Update a normal user
  const { error: err2 } = await supabase
    .from('users')
    .update({ password: hashedPassword })
    .eq('username', 'a');

  if (err1 || err2) {
    console.error("Error updating passwords:", err1 || err2);
  } else {
    console.log("Successfully reset passwords to 'password123' for 'admin' and 'a'.");
  }
}

resetPasswords();
