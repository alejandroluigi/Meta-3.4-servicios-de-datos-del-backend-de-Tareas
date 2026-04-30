const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

hooks:{
 beforeCreate: async(usuario)=>{
   usuario.password = await bcrypt.hash(usuario.password,10);
 }
}

exports.register = async (req,res)=>{
 const {email,password}=req.body;
 const hash = await bcrypt.hash(password,10);
 const user = await Usuario.create({email,password:hash,activo:true});
 res.status(201).json(user);
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
