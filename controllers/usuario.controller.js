import db from '../models/index.js';
const { Usuario, Persona, Tarea, Tag } = db;
import { Op } from 'sequelize';

export const getAll = async (req,res)=>{

  try{

    const data = await Usuario.findAll({

      attributes:{
        exclude:['password']
      }
    });

    res.json(data);

  }catch(error){

    res.status(500).json({
      error:error.message
    });
  }
};

export const getById = async (req,res)=>{
 res.json(await Usuario.findByPk(req.params.id,{
   attributes:{ exclude:['password'] }
 }));
};

export const update = async (req,res)=>{
 await Usuario.update(req.body,{where:{id:req.params.id}});
 res.json({success:true});
};

export const remove = async (req,res)=>{
  try{
    const usuario = await Usuario.findByPk(
      req.params.id,
      {
        include:[{
          model:Persona,
          as:'persona',
          //required:true,
          include:[{
            model:Tarea,
            as:'tareas',

            include:[Tag]
          }]
        }]
      }
    );

    if(!usuario){
      return res.status(404).json({
        error:'Usuario no encontrado'
      });
    }

    // PERSONA
    const persona = usuario.persona;

    if(persona){

      // TAREAS
      for(const tarea of persona.tareas){

        // ELIMINAR RELACIONES TAREA-TAG
        await tarea.setTags([]);

        // ELIMINAR TAREA
        await tarea.destroy();
      }

      // ELIMINAR PERSONA
      await persona.destroy();
    }

    // ELIMINAR USUARIO
    await Usuario.destroy({where:{id:req.params.id}});
    res.json({success:true});

  } catch(error){
    res.status(500).json({
      error:error.message
     });
  }
};

export const activar = async (req,res)=>{
 await Usuario.update({activo:true},{where:{id:req.params.id}});
 res.json({success:true});
};

export const desactivar = async (req,res)=>{
 await Usuario.update({activo:false},{where:{id:req.params.id}});
 res.json({success:true});
};

export const buscarPorTags = async (req,res)=>{

  const { tags } = req.body;

  const usuarios = await Usuario.findAll({

    attributes:{
      exclude:['password']
    },

    include:[{

      model: Persona,
      as:'persona',
      required:true,

      include:[{

        model:Tarea,
        as:'tareas',
        required:true,

        include:[{

          model:Tag,
          required:true,

          where:{
            nombre:{
              [Op.in]: tags
            }
          }
        }]
      }]
    }]
  });

  res.json(usuarios);
};
/**/