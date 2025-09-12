import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const SUPABASE_URL = 'https://chknwkydkpwiyssmsusn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNoa253a3lka3B3aXlzc21zdXNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwNzQ2NTcsImV4cCI6MjA3MjY1MDY1N30.AIbcj7lbmINbyplS196ZwmTdSglxRnXT_L9e9NKYv7I';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
