require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', require('./routes/auth.routes'));
app.use('/usuario', require('./routes/usuario.routes'));
app.use('/personas', require('./routes/persona.routes'));
app.use('/tareas', require('./routes/tarea.routes'));
app.use('/tags', require('./routes/tag.routes'));

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

db.sequelize.authenticate().then(() => {
  app.listen(process.env.PORT, () => console.log('Servidor activo'));
});