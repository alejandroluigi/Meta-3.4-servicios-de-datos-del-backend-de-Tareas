import db from '../models/index.js';
const { Tag, Tarea, Persona, Usuario } = db;
import { Op } from 'sequelize';

export const getAll = async (req,res)=>{

  // ADMIN VE TODO
  if(req.user.rol === 'ADMIN'){

    const tags = await Tag.findAll();

    return res.json(tags);
  }

  // USER SOLO VE SUS TAGS
  const tags = await Tag.findAll({

    include:[{

      model:Tarea,

      required:true,

      where:{
        personaId:req.user.personaId
      }
    }]
  });

  res.json(tags);
};

export const getTodos = async (req,res)=>{

  const tags = await Tag.findAll();

  res.json(tags);
};

export const getById = async (req, res) => {
  try {
    const data = await Tag.findByPk(req.params.id);

    if (!data)
      return res.status(404).json({ error: 'No encontrado' });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const create = async (req,res)=>
  res.status(201).json(await Tag.create(req.body));

export const update = async (req,res)=>{
  await Tag.update(req.body,{
    where:{id:req.params.id}
  });
  res.json({success:true});
};

export const remove = async (req,res)=>{
  const tag = await Tag.findByPk(
    req.params.id,
    {
      include:[Tarea]
    }
  );

  if(!tag){

    return res.status(404).json({
      error:'Tag no encontrado'
    });
  }

  // VALIDAR RELACIONES
  if(tag.Tareas.length > 0){
    return res.status(400).json({
      error:'No se puede eliminar un tag que tiene tareas asociadas'
    });
  }
  await Tag.destroy({
    where:{id:req.params.id}
  });
  res.json({success:true});
};

export const getPersonas = async (req, res) => {

  try {

    const data = await Tag.findByPk(
      req.params.id,
      {
        include: [
          {
            model: Tarea,

            include: [
              {
                model: Persona,
                as: 'persona'
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

export const getTareas = async (req,res)=>{
  res.json(await Tag.findByPk(req.params.id,{
    include:Tarea
  }));
};

export const buscarPorUsuarios = async (req,res)=>{

  const { usuarios } = req.body;

  const tags = await Tag.findAll({

    include:[{

      model:Tarea,

      include:[{

        model:Persona,
        as:'persona',

        include:[{

          model:Usuario,
          as:'usuario',

          where:{
            email:{
              [Op.in]: usuarios
            }
          }
        }]
      }]
    }]
  });

  res.json(tags);
};

export const getTagsPorUsuario = async (req,res)=>{

  const usuario = await Usuario.findByPk(
    req.params.usuarioId
  );

  if(!usuario){

    return res.status(404).json({
      error:'Usuario no encontrado'
    });
  }

  const tags = await Tag.findAll({

    include:[{

      model:Tarea,

      required:true,

      where:{
        personaId:usuario.personaId
      }
    }]
  });

  res.json(tags);
};
/**/