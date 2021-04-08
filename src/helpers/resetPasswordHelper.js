import models from '../database/models';


const findResetRequest = async(userId) => {
   try{
     let request = await models.PasswordReset.findOne({
         where: {id:userId, verified: false}
     });
     if(!request)
      return false;
     return request; 
   }
   catch(e){
       return false;
   }
}

const createResetRequest = async(userId, code) => {
    _inactivateRequests(userId)
    try{
     let newRequest = await models.PasswordReset.create({
         code,
         userId
     });
     return newRequest;
    }
    catch(e){
      return false;
    }
}

const _inactivateRequests = (userId) => {
  models.PasswordReset.update({status:'INACTIVE'}, {where: {userId}})
}

const verifyPasswordResetCode = async(userId, code) => {
  let request;
  try{
     request = await models.PasswordReset.findOne({where: {
         userId,
         status: 'ACTIVE'
     }});
     if(!request){
        return false;
   }
  }  
  catch(e){
     return false;
  }
  if(request.code != code)
    return false;
   
  try{
    await models.PasswordReset.update({status: 'INACTIVE', verified: true}, {where: {id: request.id}});
  } 
  catch(e){
      return false;
  }
  return true;
}

export {createResetRequest, verifyPasswordResetCode}
