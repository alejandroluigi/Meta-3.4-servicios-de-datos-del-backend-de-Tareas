const admin = (req,res,next)=>{

  if(req.user.rol !== 'ADMIN'){
    return res.status(403).json({
      error:'Solo administrador'
    });
  }

  next();
};

export default admin;
/**/
