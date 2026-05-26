import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import db from '../models/index.js';
const { Persona, Usuario } = db;

export const register = async (req, res) => {

  try {

    const { nombre, email, password } = req.body;

    const existe = await Usuario.findOne({
      where: { email }
    });

    if (existe) {
      return res.status(400).json({
        error: 'Usuario ya existe'
      });
    }

    // CREAR PERSONA
    const persona = await Persona.create({
      nombre,
      email
    });

    // HASH PASSWORD
    const hash = await bcrypt.hash(password, 10);

    // CREAR USUARIO
    const user = await Usuario.create({
      nombre,
      email,
      password: hash,
      activo: true,
      personaId: persona.id,
      rol:'USER',
      activo:true
    });

    res.status(201).json(user);

  } catch (error) {
    console.log(error);
    console.log(error.errors);

    res.status(500).json({
      error: error.message,
      details:error.errors
    });
  }
};

export const login = async (req,res)=>{

  const {email,password}=req.body;
  const user = await Usuario.findOne({where:{email}});
  
  if(!user || !user.activo) return res.status(401).json({error:'Usuario inválido'});
  
  const ok = await bcrypt.compare(password,user.password);
  
  if(!ok) return res.status(401).json({error:'Credenciales incorrectas'});
  
  // CSRF TOKEN
  const csrfToken = crypto
    .randomBytes(32)
    .toString('hex');

    // HASH
  const csrfHash = crypto
    .createHash('sha256')
    .update(csrfToken)
    .digest('hex');

  // JWT
    const token = jwt.sign({
    id: user.id,
    rol: user.rol,
    personaId: user.personaId,
    csrf_hash:csrfHash
  },
  
  process.env.JWT_SECRET,
  {
    expiresIn: '2h'
  });
  //res.json({token});
  // COOKIE JWT
  res.cookie('access_token', token, {

    httpOnly:true,
    secure:true,
    sameSite:'strict',
    //maxAge: 2 * 60 * 60 * 1000
  });

  // COOKIE CSRF
  res.cookie('csrf_token', csrfToken, {

    httpOnly:false,
    secure:true,
    sameSite:'strict',

    //maxAge: 2 * 60 * 60 * 1000
  });

  res.json({
    //success:true
    ok:true
  });
};

export const me = async (req, res) => {
  const user = await Usuario.findByPk(req.user.id);

  if (!user || !user.activo) {
    return res.status(403).json({ error: 'No autorizado' });
  }

  res.json(user);
};

export const logout = async (req,res)=>{

  res.clearCookie('access_token');

  res.clearCookie('csrf_token');

  res.json({
    success:true
  });
};
