import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pibshlxkwwixfguhvrto.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpYnNobHhrd3dpeGZndWh2cnRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1NjU4MTEsImV4cCI6MjA4MDE0MTgxMX0.IzmEcIZDqKkGodmTMsRlg5yzL6H-hCLF9CwqRF-xEVE';

export const supabase = createClient(supabaseUrl, supabaseKey);