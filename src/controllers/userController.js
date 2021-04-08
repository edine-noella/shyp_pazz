import {verifyPassword} from '../utils/argon.util';
import models from '../database/models';
import * as _ from 'lodash';
import { signToken } from '../helpers/jwtHelper';
import {sendResetPasswordMail} from '../helpers/mailerHelper';

const _lodashProps = ['name','email','createdAt', 'updatedAt'];
/*
dummy user model
*/
const users = [
  {
    firstname:'John',
    lastname:'Doe',
    password: 'test@123',
    email: 'johndoe@gmail.com'
  },
  {
    firstname:'Keny',
    lastname:'The ninja',
    password: 'test@123',
    email: 'kenytheninja@gmail.com'
  },
  {
    firstname:'Patrick',
    lastname:'Test',
    password: 'test@123',
    email: 'patrickniyogitare28@gmail.com'
  }
]

/*
TODO: ckeck if user was verified
*/
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

const requestResetPassword = async(req,res) => {
  const {email} = req.body;
  const index = findUserByEmail(email);
  if(index == -1)
    return res.status(401).json({message: 'unauthorized'});

  const {firstname} = users[index];

  sendResetPasswordMail(email,firstname, 120347);
  return res.status(200).json({message: 'reset password link sent'});
}

/*
TODO: function optimazation after singup feature is merged
*/
const findUserByEmail = (email) => {
 return users.findIndex(user => user.email == email);
}
export {signin, logout, requestResetPassword};

