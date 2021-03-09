import models from '../database/models';

const createUser = async(req,res) => {
    const {name, email} = req.body;
    const newUser = await models.TestUser.create({name, email});
    if(newUser)
     return res.status(201).json({message: 'Test user created', testUser: newUser});
}

export {createUser};