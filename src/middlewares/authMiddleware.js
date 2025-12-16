import jwt from 'jsonwebtoken';
import config from '../config/index.js';

export default (req,res,next)=>{
  if(req.headers['x-api-key'] === config.API_KEY) return next();
  const auth = req.headers.authorization;
  if(auth?.startsWith('Bearer ')){
    try{ jwt.verify(auth.split(' ')[1], config.JWT_SECRET); return next(); }
    catch{}
  }
  res.status(401).json({statusCode:401,error:'No autorizado'});
};