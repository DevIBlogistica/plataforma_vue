import { createClient } from '@supabase/supabase-js';

// URL e chave anonima do Supabase (substitua pelos valores corretos)
const supabaseUrl = "https://kjlwqezxzqjfhacmjhbh.supabase.co";  // Coloque sua URL do Supabase aqui
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqbHdxZXp4enFqZmhhY21qaGJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1NDY3OTgsImV4cCI6MjA1MzEyMjc5OH0.bB58zKtOtIyd4pZl-lycUQFVyHsQK_6Rxe2XtYta_cY";
const supabase = createClient(supabaseUrl, supabaseKey);

export const getUserData = async () => {
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) {
    console.error('Erro ao buscar sessão do usuário:', sessionError.message);
    return null;
  }
  const user = session?.user;
  if (user) {
    const { data, error } = await supabase
      .from('profiles')
      .select('nome, cargo, adminProfile')
      .eq('user_id', user.id)
      .limit(1)
      .single();
    if (error) {
      console.error('Erro ao buscar dados do usuário:', error.message);
      return null;
    }
    return data;
  }
  return null;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Erro ao fazer logout:', error.message);
  }
};

export default supabase;