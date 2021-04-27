import models from '../database/models';
import {findUserById} from './userController';
import {uuiSigner} from '../utils/signUniqueId';

const {ShypCrew} = models;

/*
@TODO validate the user status
*/
const registerUserAsShypCrew = async(req,res) => {
    req.body.userId = req.loggedInUser.id;
    req.body.id = await uuiSigner()
    let shypcrew;
    try{
        shypcrew = await ShypCrew.create(req.body);
    }catch(error){
        return res.status(400).json({message:'Shypcrew not created', error:error.message});
    }
    return res.status(201).json({
        message:'Shypcrew registered',
        shypcrew,
        user: req.loggedInUser
    })
}

export {registerUserAsShypCrew};