const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');
const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

/*hooks:{
 beforeCreate: async(usuario)=>{
   usuario.password = await bcrypt.hash(usuario.password,10);
 }
}*/

/*
exports.register = async (req,res)=>{
 const {email,password}=req.body;
 const hash = await bcrypt.hash(password,10);
 const user = await Usuario.create({email,password:hash,activo:true});
 res.status(201).json(user);
};*/

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: 'Datos incompletos' });

    const existe = await Usuario.findOne({ where: { email } });
    if (existe)
      return res.status(400).json({ error: 'Usuario ya existe' });

    const hash = await bcrypt.hash(password, 10);

    const user = await Usuario.create({
      email,
      password: hash,
      activo: true
    });

    res.status(201).json({
      id: user.id,
      email: user.email
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req,res)=>{
 const {email,password}=req.body;
 const user = await Usuario.findOne({where:{email}});
 if(!user || !user.activo) return res.status(401).json({error:'Usuario inválido'});
 const ok = await bcrypt.compare(password,user.password);
 if(!ok) return res.status(401).json({error:'Credenciales incorrectas'});
 const token = jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:'2h'});
 res.json({token});
};

exports.googleLogin = (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['profile', 'email']
  });

  res.redirect(url);
};

exports.googleCallback = async (req, res) => {
  const { code } = req.query;

  console.log('CODE:', code); // 👈 agrega esto

  try {
    const { tokens } = await oauth2Client.getToken(code);

    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: 'v2'
    });

    const { data } = await oauth2.userinfo.get();

    // 🔍 Buscar usuario
    let user = await Usuario.findOne({
      where: { email: data.email }
    });

    // 🆕 Crear si no existe
    if (!user) {
      user = await Usuario.create({
        email: data.email,
        password: null,
        activo: true
      });
    }

    // 🔐 Generar JWT
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    // 🔁 Redirigir al frontend
    res.redirect(`https://localhost:3000/oauth-success?token=${token}`);

  } catch (error) {
    console.error('ERROR GOOGLE:', error); // 👈 importante
    res.status(500).json({ error: error.message });
  }
};