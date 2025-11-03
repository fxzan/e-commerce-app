import {createClient} from "@supabase/supabase-js";

const supabaseUrl = "https://dffuaugrsggqygrioucn.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmZnVhdWdyc2dncXlncmlvdWNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxMDYyODgsImV4cCI6MjA3NzY4MjI4OH0.To-48ytUfAp4CT6aX7ZQl46YdcRaQnDyjk12s_7N_ck"

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;