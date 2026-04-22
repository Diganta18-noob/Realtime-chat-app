import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve('.env') });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

async function check() {
  const { data: users, error } = await supabase.from('users').select('username, role');
  if (error) {
    console.error(error);
  } else {
    for (const u of users) {
      console.log(`- Username: ${u.username} | Role: ${u.role}`);
    }
  }
}

check();
