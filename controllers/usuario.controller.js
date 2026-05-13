const { Usuario } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const data = await Usuario.findAll({
      attributes: { exclude: ['password'] }
    });

    res.json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req,res)=>{
 res.json(await Usuario.findByPk(req.params.id,{
   attributes:{ exclude:['password'] }
 }));
};

exports.update = async (req,res)=>{
 await Usuario.update(req.body,{where:{id:req.params.id}});
 res.json({success:true});
};

exports.remove = async (req,res)=>{
 await Usuario.destroy({where:{id:req.params.id}});
 res.json({success:true});
};

exports.activar = async (req,res)=>{
 await Usuario.update({activo:true},{where:{id:req.params.id}});
 res.json({success:true});
};

exports.desactivar = async (req,res)=>{
 await Usuario.update({activo:false},{where:{id:req.params.id}});
 res.json({success:true});
};