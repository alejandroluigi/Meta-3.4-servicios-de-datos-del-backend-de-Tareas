const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  //const auth = req.headers.authorization;
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'No token' });

  //const token = auth.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
    //req.user = jwt.verify(token, process.env.JWT_SECRET);
    //next();
  } catch {
    res.status(401).json({ error: 'Token inválido' });
  }
};