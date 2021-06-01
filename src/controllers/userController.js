import {hashPassword,verifyPassword} from '../utils/argon.util';
import models from '../database/models';
import * as _ from 'lodash';
import { signToken } from '../helpers/jwtHelper';
import {sendResetPasswordMail} from '../helpers/mailerHelper';
import {uuiSigner} from '../utils/signUniqueId';
import {createResetRequest, verifyPasswordResetCode} from '../helpers/resetPasswordHelper';
import {generateVerificationCode} from '../utils/generateVerificationCode';

const _lodashProps = ['id','name','email','username','phone','country','userType','createdAt', 'updatedAt',];
/*
TODO: ckeck if user was verified, update the login and password reset
*/

const signin = async(req,res) => {
    const {username,password} = req.body;
    console.log(req.body)
    let user;
    try{
     user = await models.AllUsers.findOne({where: {username}})
     if(!user)
      return res.status(401).json({message: "Invalid username or password"});
     }
    catch(e){
      return res.status(401).json({message: "Invalid username or password"});
    }
    const isPasswordValid = await verifyPassword(user.password, password);
    const token = await signToken(_.pick(user,_lodashProps));
    if(!isPasswordValid)
      return res.status(401).json({message: "Invalid username or password"});
    return res.status(200).json({
      message: "authorized", 
      user: _.pick(user,_lodashProps),
      token,
    });
}

const logout = async(_,res) => {
   process.env.JWT_KEY = undefined;
   return res.status(200).json({message: 'logged out successfully'});
}

const requestResetPassword = async(req,res) => {
  const {email} = req.body;
  const user = await findUserByEmail(email);
  if(!user)
    return res.status(401).json({message: 'unauthorized'});

  const _verificationCode = await generateVerificationCode();
  const resetRequest = await createResetRequest(user.id, _verificationCode);
  if(!resetRequest)
    return res.status(400).json({message: 'reset password failed'});
   
  sendResetPasswordMail(email,user.name, _verificationCode);
  return res.status(200).json({message: 'reset password link  sent to '+email});
}

/*
TODO: function optimazation after singup feature is merged
*/



const  signup  =  async(req,res) => {
  const {name, email,password,username,country,phone} = req.body;
  const hashedPassword = await hashPassword(password);
 
models.AllUsers.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(async(AllUsers) => {
      if (AllUsers) {
        return res.status(409).json({
          message: 'username arleady in use',
        });

      }
    
     let isEmailUsed = await findUserByEmail(email);
     if(isEmailUsed)
       return res.status(409).json({
         message:"email already in use"
       });

     let newUser =  await models.AllUsers.create({
        id: uuiSigner(),
        name,
        phone,
        email,
        password: hashedPassword,
        username,
        country
  })
  const token = await signToken(_.pick(newUser,_lodashProps));
  return res.status(201).json({
    message: 'user registered', 
    user: _.pick(newUser, _lodashProps), 
    token
  })
     
    })
    .catch((error) => res.status(400).json(error.message));
};



const resetPassword = async(req,res) => {
  const code = req.params.code;
  const {email, newPassword} = req.body;
  const user = await findUserByEmail(email)
  if(!user)
     return res.status(400).json({message: 'reset password failed'});

  const isCodeValid = await verifyPasswordResetCode(user.id, code);
  if(!isCodeValid)
    return res.status(400).json({message: 'resetting password failed'});
    const hashedPass = await hashPassword(newPassword);
    try{
      await models.User.update({password: hashedPass}, {where: {id: user.id}})
      return res.status(200).json({message:'Password successfully reset'});
    }
    catch(e){
      return res.status(400).json({message: 'resetting password failed'});
    }
}

const findUserByEmail = async(email) => {
  try{
   let user = await models.User.findOne({
     where: {email:email}
   })
   return user;
  }
  catch(e){
     return false;
  }
 }

 const findUserById = async(userId) => {
   try{
      let user = await models.User.findByPk(userId);
      if(!user)
        return false;
      return user;
   }  
   catch(e){
      return false;
   }
  }
export {signin,signup,logout, requestResetPassword, resetPassword, findUserById};

