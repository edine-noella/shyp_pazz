import {decodeToken} from '../helpers/jwtHelper';
import {ADMIN} from '../helpers/rolesEnums';

const isAdmin = async(req,res,next) => {
    let token;
    try{
        token = req.header.authorization.split(" ")[1];
        if(!token)
         return res.status(401).json({message:'unauthorized'});
    }
    catch(e){
        console.log("Error: "+e);
      return res.status(401).json({message: 'unauthorized'})
    }

    const payload = await decodeToken(token);
    if(!payload)
      return res.status(401).json({message: 'unauthorized'});
    if(payload.userType != ADMIN) 
      return res.status(401).json({message: 'access denied'})
    req.loggedInUser = payload;  
    next();
}
export {isAdmin};