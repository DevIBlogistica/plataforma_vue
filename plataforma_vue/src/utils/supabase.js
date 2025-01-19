// src/utils/supabase.js

import { createClient } from '@supabase/supabase-js';

// URL e chave anonima do Supabase (substitua pelos valores corretos)
const supabaseUrl = "https://ivyjqvydorsgucqraiuw.supabase.co";  // Coloque sua URL do Supabase aqui
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2eWpxdnlkb3JzZ3VjcXJhaXV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0NDM3MzUsImV4cCI6MjA1MjAxOTczNX0.1-QMzndUOwC1BAJDRMcX_UvAwkPpdy3vM_kc2VZYQDo"; // Coloque sua chave aqui

// Criando e exportando a instância do cliente Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
