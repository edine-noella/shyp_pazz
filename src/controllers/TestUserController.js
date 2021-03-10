import models from '../database/models';
import {hashPassword, verifyPassword} from '../utils/argon.util';
const createUser = async(req,res) => {
    const {name, email,password} = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = await models.TestUser.create({name, email,password:hashedPassword});
    if(newUser)
     return res.status(201).json({message: 'Test user created', testUser: newUser});
}

export {createUser};