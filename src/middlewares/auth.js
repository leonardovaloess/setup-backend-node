import jwt from 'jsonwebtoken';
import { promisify } from 'util';



export default async (req,res,next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader){
    return res.status(401).json({error: "token não existe"});
  }
  
  // Tirando a palavra Bearer do token
  const [, token] = authHeader.split(' ');

  try{
    // O promisify foi usado aqui, pois o callback
    // do jwt.verify é antigo, ai pra usar a função assincrona tinha que ter o promisify   
  
    const decoded = await promisify(jwt.verify)(token, process.env.SECRET);
  
    // Adicionando um req para acessar depois do middleware
    req.userId = decoded.id;
    
    return next();
  
  } catch(err){
    return res.status(401).json({error: "token inválido!"});
  }
}