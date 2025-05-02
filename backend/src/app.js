const express = require('express');
const cors = require('cors');
const config = require('./utils/config');

const app = express();
app.use(cors());
app.use(express.json());

const routes = require('./routes');
app.use('/api', routes);

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en el puerto ${PORT} en modo ${config.nodeEnv}`);
});