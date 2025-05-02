// Configuración centralizada para acceder a variables de entorno

// En producción, si no se especifica la URL completa, usamos la URL del navegador
// para construir la URL de la API
function getApiUrlFromWindow() {
  if (typeof window !== 'undefined') {
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    return `${protocol}//${hostname}:5000/api`;
  }
  return '';
}

export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 
          (typeof window === 'undefined' ? 'http://localhost:5000/api' : getApiUrlFromWindow()),
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  }
};