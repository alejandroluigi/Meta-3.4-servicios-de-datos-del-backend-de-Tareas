import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import db from './models/index.js';

import https from 'https';
import fs from 'fs';

import selfsigned from 'selfsigned';

import cookieParser from 'cookie-parser';
//import csrf from 'csurf';

import authRoutes from './routes/auth.routes.js';
import usuarioRoutes from './routes/usuario.routes.js';
import personaRoutes from './routes/persona.routes.js';
import tareaRoutes from './routes/tarea.routes.js';
import tagRoutes from './routes/tag.routes.js';

import csrfMiddleware from './middleware/csrf.js';
import auth from './middleware/auth.js';

const app = express();

app.use(express.json());

app.use(cors({
  origin:'https://localhost:3000',
  credentials:true
}));

app.use(cookieParser());

app.use('/auth',authRoutes);
app.use('/usuarios',auth,csrfMiddleware, usuarioRoutes);
app.use('/personas',auth,csrfMiddleware, personaRoutes);
app.use('/tareas',auth,csrfMiddleware, tareaRoutes);
app.use('/tags',auth,csrfMiddleware, tagRoutes);

app.use((err,req,res,next)=>{

  if(err.code === 'EBADCSRFTOKEN'){

    return res.status(403).json({
      error:'CSRF token inválido'
    });
  }

  res.status(500).json({
    error:err.message
  });
});

async function startServer(){

  const attrs = [
    {
      name:'commonName',
      value:'localhost'
    }
  ];

  if(
    !fs.existsSync('server.key') ||
    !fs.existsSync('server.cert')
  ){

    const pems = await selfsigned.generate(
      attrs,
      { days:365 }
    );

    fs.writeFileSync(
      'server.key',
      pems.private
    );

    fs.writeFileSync(
      'server.cert',
      pems.cert
    );
  }

  const options = {

    key:fs.readFileSync('server.key'),

    cert:fs.readFileSync('server.cert')
  };

  await db.sequelize.authenticate();

  console.log('Base de datos conectada');

  https.createServer(
    options,
    app
  ).listen(process.env.PORT,()=>{

    console.log('Servidor HTTPS activo');
    console.log(`Servidor HTTPS activo en puerto ${process.env.PORT}`);
  });
}

startServer();
