import {decodeToken} from '../helpers/jwtHelper';

const isAuthorized = async(req,res,next) => {
    let token;
    try{
      token =  req.headers.authorization.split(' ')[1];
    }
    catch(err) {
       console.log(err)
       return res.status(401).json({message: 'unauthorized'}); 
    }
  
    let decode = await decodeToken(token);
    if(!decode)
      return res.status(401).json({message: 'unauthorized'})
    req.loggedInUser = decode;
    next();
}

export {isAuthorized};