import db from '../models/index.js';
const { Tarea, Tag, Persona } = db;
import { Op } from 'sequelize';

export const getAll = async (req, res) => {

  const tareas = await Tarea.findAll({
    where: {
      personaId: req.user.personaId
    },
    include: [Tag]
  });

  res.json(tareas);
};

export const getById = async (req,res)=>{

  const tarea = await Tarea.findOne({

    where:{
      id:req.params.id,
      personaId:req.user.personaId
    },

    include:[Tag]
  });

  if(!tarea){

    return res.status(404).json({
      error:'No encontrada'
    });
  }

  res.json(tarea);
};

export const create = async (req, res) => {

  try{

    const tarea = await Tarea.create({

      titulo:req.body.titulo,
      completada:req.body.completada,
      personaId:req.user.personaId,
      usuarioId:req.user.id
    });

    res.status(201).json(tarea);

  }catch(error){

    console.log(error);

    res.status(500).json({
      error:error.message
    });
  }
};

export const update = async (req,res)=>{

  const tarea = await Tarea.findOne({

    where:{
      id:req.params.id,
      personaId:req.user.personaId
    }
  });
  
  if(!tarea){
    return res.status(404).json({
      error:'No encontrada'
    });
  }
  await Tarea.update(req.body,{
    where:{id:req.params.id}
  });
  res.json({success:true});
};

export const remove = async (req,res)=>{

  const tarea = await Tarea.findOne({

    where:{
      id:req.params.id,
      personaId:req.user.personaId
    },
    include:[Tag]
  });

  if(!tarea){
    return res.status(404).json({
      error:'No encontrada'
    });
  }

  await tarea.setTags([]);

  await Tarea.destroy({
    where:{id:req.params.id}
  });
  res.json({success:true});
};

export const addTag = async (req,res)=>{
  const t = await Tarea.findOne({
    where:{
      id:req.params.tareaId,
      personaId:req.user.personaId
    }
  });

  if(!t){

    return res.status(404).json({
      error:'Tarea no encontrada'
    });
  }

  const g=await Tag.findByPk(req.params.tagId);

  if(!g){

    return res.status(404).json({
      error:'Tag no encontrado'
    });
  }

  await t.addTag(g);
  res.json({success:true});
};

export const getTags = async (req,res)=>{

  const tarea = await Tarea.findByPk(
    req.params.id,
    {
      include:[Tag]
    }
  );

  if(!tarea){

    return res.status(404).json({
      error:'Tarea no encontrada'
    });
  }

  res.json(tarea.Tags);
};

export const getPersona = async (req, res) => {

  const tarea = await Tarea.findByPk(req.params.id, {
    include: [{
      model: Persona,
      as: 'persona'
    }]
  });

  if(!tarea || !tarea.persona){
    return res.status(404).json({
      error:'Persona no encontrada'
    });
  }

  res.json(tarea.persona);

};

export const buscar = async (req, res) => {
  try {
    const data = await Tarea.findAll({
      where: {
        personaId:req.user.personaId,
        titulo: {
          [Op.like]: `%${req.params.texto}%`
        }
      },

      include: [Tag]
    });

    res.json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeTag = async (req, res) => {
    const t = await Tarea.findOne({
      where:{
        id:req.params.tareaId,
        personaId:req.user.personaId
      }
    });

    if(!t){
      return res.status(404).json({
        error:'Tarea no encontrada'
      });
    }

    const g = await Tag.findByPk(req.params.tagId);
    if(!g){
      return res.status(404).json({
        error:'Tag no encontrado'
      });
    }

    await t.removeTag(g);
    res.json({ success: true });
};

export const buscarPorTags = async (req,res)=>{

  const { tags } = req.body;

  const tareas = await Tarea.findAll({

    where:{
      personaId:req.user.personaId
    },

    include:[{
      model:Tag,

      where:{
        nombre:{
          [Op.in]: tags
        }
      }
    }]
  });

  res.json(tareas);
};

export const buscarAdminPorTags = async (req,res)=>{

  const { tags } = req.body;

  const tareas = await Tarea.findAll({

    include:[{

      model:Tag,
      required:true,

      where:{
        nombre:{
          [Op.like]: `%${tags}%`
        }
      }
    }]
  });

  res.json(tareas);
};