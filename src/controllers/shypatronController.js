import models from '../database/models';
import { uuiSigner } from '../utils/signUniqueId';
/*
 @Role existing user is registered as a shypatron
*/
const registerUserAsShypatron = async(req,res) => {
    let {id, phone, country} = req.loggedInUser;
    req.body.id = uuiSigner();
    req.body.userId = id;
    req.body.phone = phone;
    req.body.country = country;
    let newUser;
    try{
       newUser = await models.Shypatron.create(req.body);
       console.log(newUser)
       if(!newUser)
         return res.status(400).json({message: 'Shypatron registration failed'});
        return res.status(201).json({
            message:'Shypatron created',
            payloads: newUser,
            user: req.loggendInUser
        }) 
    }
    catch(error){
        return res.status(400).json({error: 'Shyptron already exist'})
    }
}

const getShypatrons = async(_,res) => {
    let shypatrons = await models.Shypatron.findAll();
    return res.status(200).json(shypatrons);
}

export {registerUserAsShypatron,getShypatrons};