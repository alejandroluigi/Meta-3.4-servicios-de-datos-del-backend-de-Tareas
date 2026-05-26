import db from '../models/index.js';
const { Persona, Tarea, Tag } = db;
import { Op } from 'sequelize';

export const getAll = async (req,res)=>
  res.json(await Persona.findAll());

export const getById = async (req, res) => {
  try {
    const data = await Persona.findByPk(req.params.id);

    if (!data)
      return res.status(404).json({ error: 'No encontrado' });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const create = async (req,res)=>
  res.status(201).json(await Persona.create(req.body));

export const update = async (req,res)=>{
  await Persona.update(req.body,{
    where:{id:req.params.id}
  });
  res.json({success:true});
};

export const remove = async (req,res)=>{
  await Persona.destroy({
    where:{id:req.params.id}
  });
  res.json({success:true});
};

export const addTarea = async (req, res) => {
  try {
    const p = await Persona.findByPk(req.params.personaId);
    const t = await Tarea.findByPk(req.params.tareaId);

    if (!p || !t)
      return res.status(404).json({ error: 'Persona o tarea no existe' });

    t.personaId = p.id;
    await t.save();

    res.json({ success: true });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTareas = async (req, res) => {

  const data = await Persona.findByPk(req.params.id, {
    include: {
      model: Tarea,
      as: 'tareas'
    }
  });

  res.json(data);

};

export const getTags = async (req, res) => {

  try {

    const data = await Persona.findByPk(
      req.params.id,
      {
        include: [
          {
            model: Tarea,
            as: 'tareas',

            include: [
              {
                model: Tag,
                as: 'Tags'
              }
            ]
          }
        ]
      }
    );

    res.json(data);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: error.message
    });

  }

};

export const removeTarea = async (req, res) => {
  const p = await Persona.findByPk(req.params.personaId);
  const t = await Tarea.findByPk(req.params.tareaId);

  if (!t) {
    return res.status(404).json({
      error: 'Tarea no encontrada'
    });
  }

  t.personaId = null;
  await t.save();

  res.json({ success: true });
};

export const buscar = async (req, res) => {
  const data = await Persona.findAll({
    where: {
      nombre: {
        [Op.like]: `%${req.params.texto}%`
      }
    }
  });

  res.json(data);
};