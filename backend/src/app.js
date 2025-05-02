const express = require('express');
const cors = require('cors');
const config = require('./utils/config');

const app = express();
// Configurar CORS para permitir peticiones desde cualquier origen en producción
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? '*' : 'http://localhost:3006',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

const routes = require('./routes');
app.use('/api', routes);

const PORT = config.port;
const HOST = process.env.HOST || '0.0.0.0'; // Escuchar en todas las interfaces

app.listen(PORT, HOST, () => {
  console.log(`Servidor backend escuchando en ${HOST}:${PORT} en modo ${config.nodeEnv}`);
});