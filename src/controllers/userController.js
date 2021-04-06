import {verifyPassword} from '../utils/argon.util';
import models from '../database/models';
import * as _ from 'lodash';
import { signToken } from '../helpers/jwtHelper';

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

export {signin};

