import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ep-cool-wave-aed16q9x-pooler.c-2.us-east-2.aws.neon.tech/neondb';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOm51bGx9.placeholder';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  },
  db: {
    schema: 'public'
  }
});
