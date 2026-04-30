const { Tarea, Tag } = require('../models');

exports.getAll = async (req,res)=>
  res.json(await Tarea.findAll());

exports.getById = async (req,res)=>
  res.json(await Tarea.findByPk(req.params.id));

exports.create = async (req,res)=>
  res.status(201).json(await Tarea.create(req.body));

exports.update = async (req,res)=>{
  await Tarea.update(req.body,{
    where:{id:req.params.id}
  });
  res.json({success:true});
};

exports.remove = async (req,res)=>{
  await Tarea.destroy({
    where:{id:req.params.id}
  });
  res.json({success:true});
};

exports.addTag = async (req,res)=>{
  const t=await Tarea.findByPk(req.params.tareaId);
  const g=await Tag.findByPk(req.params.tagId);
  await t.addTag(g);
  res.json({success:true});
};

exports.getTags = async (req,res)=>
  res.json(await Tarea.findByPk(req.params.id,{include:Tag}));

exports.getPersonas = async (req,res)=>{
 res.json(await Tarea.findByPk(req.params.id,{
   include: Persona
 }));
};

exports.buscar = async (req,res)=>{
 const data = await Tarea.findAll({
   where:{
     titulo:{
       [Op.like]: `%${req.params.texto}%`
     }
   }
 });
 res.json(data);
};