// Configuración centralizada para acceder a variables de entorno
require('dotenv').config();

const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  apiUrl: process.env.API_URL || 'http://localhost:5000/api',
  cors: {
    // Si CORS_ALLOWED_ORIGINS existe, dividirlo en un array; de lo contrario, usar '*' en desarrollo
    allowedOrigins: process.env.CORS_ALLOWED_ORIGINS 
      ? process.env.CORS_ALLOWED_ORIGINS.split(',') 
      : (process.env.NODE_ENV === 'production' ? ['http://localhost:3006'] : '*')
  },
  supabase: {
    url: process.env.SUPABASE_URL || '',
    key: process.env.SUPABASE_KEY || '',
  }
};

module.exports = config;