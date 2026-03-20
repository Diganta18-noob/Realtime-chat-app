// Temporary migration script to add missing columns to users table
import './backend/config.js';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

async function migrate() {
  // Test connection first
  const { data, error } = await supabase.from('users').select('id').limit(1);
  if (error) {
    console.error('Connection test failed:', error.message);
    // The columns might not exist yet - let's try via RPC or just test signup
  } else {
    console.log('Connection OK. Users found:', data?.length || 0);
  }

  // Try inserting and see what columns are missing
  // We'll test by trying to select the columns
  const cols = ['email', 'is_deleted', 'is_email_verified', 'email_verification_token', 
                'email_verification_expires', 'reset_password_token', 'reset_password_expires'];
  
  for (const col of cols) {
    const { error: colError } = await supabase.from('users').select(col).limit(1);
    if (colError) {
      console.log(`❌ Column "${col}" is MISSING: ${colError.message}`);
    } else {
      console.log(`✅ Column "${col}" exists`);
    }
  }
  
  console.log('\n--- If any columns are missing, run this SQL in Supabase Dashboard: ---');
  console.log(`
ALTER TABLE users ADD COLUMN IF NOT EXISTS email TEXT DEFAULT NULL;
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_deleted BOOLEAN DEFAULT false;
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_email_verified BOOLEAN DEFAULT false;
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verification_token TEXT DEFAULT NULL;
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verification_expires TIMESTAMPTZ DEFAULT NULL;
ALTER TABLE users ADD COLUMN IF NOT EXISTS reset_password_token TEXT DEFAULT NULL;
ALTER TABLE users ADD COLUMN IF NOT EXISTS reset_password_expires TIMESTAMPTZ DEFAULT NULL;
  `);
}

migrate().catch(console.error);
