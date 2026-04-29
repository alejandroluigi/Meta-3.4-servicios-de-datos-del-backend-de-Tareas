const { Persona, Tarea, Tag } = require('../models');

exports.getAll = async (req,res)=>
  res.json(await Persona.findAll());

exports.getById = async (req,res)=>
  res.json(await Persona.findByPk(req.params.id));

exports.create = async (req,res)=>
  res.status(201).json(await Persona.create(req.body));

exports.update = async (req,res)=>{
  await Persona.update(req.body,{
    where:{id:req.params.id}
  });
  res.json({success:true});
};

exports.remove = async (req,res)=>{
  await Persona.destroy({
    where:{id:req.params.id}
  });
  res.json({success:true});
};

exports.addTarea = async (req,res)=>{
  const p=await Persona.findByPk(req.params.personaId);
  const t=await Tarea.findByPk(req.params.tareaId);
  await p.addTarea(t);res.json({success:true}
  );
};

exports.getTareas = async (req,res)=>
  res.json(await Persona.findByPk(req.params.id,{include:Tarea}));

exports.getTags = async (req,res)=>
  res.json(await Persona.findByPk(req.params.id,{
    include:{model:Tarea,include:Tag}
  })
);