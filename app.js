require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./models');
const https = require('https');
const fs = require('fs');
const selfsigned = require('selfsigned');

const app = express();
async function startServer() {
  const attrs = [{ name: 'commonName', value: 'localhost' }];
  if (!fs.existsSync('server.key') || !fs.existsSync('server.cert')) {
    const pems = await selfsigned.generate(attrs, { days: 365 });

    fs.writeFileSync('server.key', pems.private);
    fs.writeFileSync('server.cert', pems.cert);
  }

  const options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
  };

  app.use(cors({
    origin: 'https://localhost:3000',
    credentials: true
  }));
  
  app.use(express.json());

  app.use('/auth', require('./routes/auth.routes'));
  app.use('/usuarios', require('./routes/usuario.routes'));
  app.use('/personas', require('./routes/persona.routes'));
  app.use('/tareas', require('./routes/tarea.routes'));
  app.use('/tags', require('./routes/tag.routes'));

  app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
  });

  await db.sequelize.authenticate();

  https.createServer(options, app).listen(process.env.PORT, () => {
    console.log('Servidor HTTPS activo');
    console.log('CLIENT ID:', process.env.GOOGLE_CLIENT_ID);
  });
}

startServer();
