const { Tarea, Tag, Persona } = require('../models');
const { Op } = require('sequelize');

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

exports.getPersona = async (req, res) => {

  const tarea = await Tarea.findByPk(req.params.id, {
    include: {
      model: Persona,
      as: 'persona'
    }
  });

  res.json(tarea);

};

exports.buscar = async (req, res) => {
  try {
    const data = await Tarea.findAll({
      where: {
        titulo: {
          [Op.like]: `%${req.params.texto}%`
        }
      }
    });

    res.json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeTag = async (req, res) => {
  const t = await Tarea.findByPk(req.params.tareaId);
  const g = await Tag.findByPk(req.params.tagId);

  await t.removeTag(g);

  res.json({ success: true });
};