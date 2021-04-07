import {verifyPassword} from '../utils/argon.util';
import models from '../database/models';
import * as _ from 'lodash';
import { signToken } from '../helpers/jwtHelper';
import {sendResetPasswordMail} from '../helpers/mailerHelper';

const _lodashProps = ['name','email','createdAt', 'updatedAt'];

const signin = async(req,res) => {
    const {email,password} = req.body;
    let user;
    try{
     user = await models.TestUser.findOne({where: {email}})
     if(!user)
      return res.status(401).json({message: "Invalid email or password"});
     }
    catch(e){
      return res.status(401).json({message: "Invalid email or password"});
    }
    const isPasswordValid = await verifyPassword(user.password, password);
    const token = await signToken(_.pick(user,_lodashProps));
    if(!isPasswordValid)
      return res.status(401).json({message: "Invalid email or password"});
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

const resetPassword = async(req,res) => {
  sendResetPasswordMail();
  return res.status(200).json({message: 'reset password link sent'});
}
export {signin, logout, resetPassword};

