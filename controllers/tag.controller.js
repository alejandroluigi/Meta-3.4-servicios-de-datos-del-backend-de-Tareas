const { Tag, Tarea, Persona } = require('../models');

exports.getAll = async (req,res)=>
  res.json(await Tag.findAll());

exports.getById = async (req,res)=>
  res.json(await Tag.findByPk(req.params.id));

exports.create = async (req,res)=>
  res.status(201).json(await Tag.create(req.body));

exports.update = async (req,res)=>{
  await Tag.update(req.body,{
    where:{id:req.params.id}
  });
  res.json({success:true});
};

exports.remove = async (req,res)=>{
  await Tag.destroy({
    where:{id:req.params.id}
  });
  res.json({success:true});
};

exports.getPersonas = async (req,res)=>
  res.json(await Tag.findByPk(req.params.id,{
    include:{model:Tarea,include:Persona}
  })
);

exports.getTareas = async (req,res)=>{
  res.json(await Tag.findByPk(req.params.id,{
    include:Tarea
  }));
};