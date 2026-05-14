const { Tag, Tarea, Persona } = require('../models');

exports.getAll = async (req,res)=>
  res.json(await Tag.findAll());

exports.getById = async (req, res) => {
  try {
    const data = await Tag.findByPk(req.params.id);

    if (!data)
      return res.status(404).json({ error: 'No encontrado' });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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

exports.getPersonas = async (req, res) => {

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

exports.getTareas = async (req,res)=>{
  res.json(await Tag.findByPk(req.params.id,{
    include:Tarea
  }));
};