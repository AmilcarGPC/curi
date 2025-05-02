// Configuración centralizada para acceder a variables de entorno
require('dotenv').config();

const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3001,
  apiUrl: process.env.API_URL || 'http://localhost:3001/api',
  supabase: {
    url: process.env.SUPABASE_URL || '',
    key: process.env.SUPABASE_KEY || '',
  }
};

module.exports = config;