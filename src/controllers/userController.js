import {hashPassword,verifyPassword} from '../utils/argon.util';
import models from '../database/models';
import * as _ from 'lodash';
import { signToken } from '../helpers/jwtHelper';
import {sendResetPasswordMail} from '../helpers/mailerHelper';
import {uuiSigner} from '../utils/signUniqueId';

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

const  signup  =  async(req,res) => {
  req.body.password  = await  hashPassword(req.body.password)
  // const {name, email,password,username,country,phone,userType} = req.body;
  // const hashedPassword = await hashPassword(password);
  // const newUser = await models.User.create({name, email,password:hashedPassword,username,country,phone,userType});
  // if(newUser)
  //  return res.status(201).json({message: 'user registered', testUser: newUser});
  
models.User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(async(user) => {
      if (user) {
        return res.status(409).json({
          message: 'Email already registered',
        });
      }
     let newUser =  await models.User.create({
        id: uuiSigner(),
        name: req.body.name,
        phone: req.body.phone || '',
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        userType: req.body.userType,
        country: req.body.country
  })
  return res.status(201).json({message: 'user registered', user: newUser})
     
    })
    .catch((error) => res.status(400).json(error.message));
};

export {signin,signup,logout, requestResetPassword};

