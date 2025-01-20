import { createClient } from '@supabase/supabase-js';

// URL e chave anonima do Supabase (substitua pelos valores corretos)
const supabaseUrl = "https://ivyjqvydorsgucqraiuw.supabase.co";  // Coloque sua URL do Supabase aqui
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2eWpxdnlkb3JzZ3VjcXJhaXV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0NDM3MzUsImV4cCI6MjA1MjAxOTczNX0.1-QMzndUOwC1BAJDRMcX_UvAwkPpdy3vM_kc2VZYQDo"; // Coloque sua chave aqui
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