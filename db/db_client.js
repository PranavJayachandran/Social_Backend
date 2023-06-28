const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.supabaseUrl,
    process.env.supabaseKey, { auth: { persistSession: false } }
);

module.exports = { supabase }