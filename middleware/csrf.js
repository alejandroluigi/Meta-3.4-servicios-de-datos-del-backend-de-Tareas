import crypto from 'crypto';

export default (req,res,next)=>{

  const protegidos = [
    'POST',
    'PUT',
    'PATCH',
    'DELETE'
  ];

  if(!protegidos.includes(req.method)){

    return next();
  }

  const csrfToken =
    req.headers['x-csrf-token'];

  if(!csrfToken){

    return res.status(403).json({
      error:'CSRF requerido'
    });
  }

  const csrfHash = crypto
    .createHash('sha256')
    .update(csrfToken)
    .digest('hex');

  if(csrfHash !== req.user.csrf_hash){

    return res.status(403).json({
      error:'CSRF inválido'
    });
  }

  next();
};
/**/