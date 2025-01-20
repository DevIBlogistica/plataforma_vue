// src/utils/supabase.js

import { createClient } from '@supabase/supabase-js';

// URL e chave anonima do Supabase (substitua pelos valores corretos)
const supabaseUrl = "https://ivyjqvydorsgucqraiuw.supabase.co";  // Coloque sua URL do Supabase aqui
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2eWpxdnlkb3JzZ3VjcXJhaXV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0NDM3MzUsImV4cCI6MjA1MjAxOTczNX0.1-QMzndUOwC1BAJDRMcX_UvAwkPpdy3vM_kc2VZYQDo"; // Coloque sua chave aqui

// Criando e exportando a instância do cliente Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

// Função para fazer logout
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error logging out:', error.message);
    throw error;
  }
}

// Função para obter dados do usuário
export async function getUserData() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    console.error('Error fetching user data:', error.message);
    throw error;
  }
  if (user) {
    const { data, error } = await supabase
      .from('profiles')
      .select('name, cargo')
      .eq('user_id', user.id)
      .single();
    if (error) {
      console.error('Error fetching profile data:', error.message);
      throw error;
    }
    console.log('User data fetched:', data);
    return data;
  }
  console.log('No user logged in');
  return null;
}