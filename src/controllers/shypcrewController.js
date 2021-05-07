import models from '../database/models';
import {findUserById} from './userController';
import {uuiSigner} from '../utils/signUniqueId';
import enums from '../helpers/enums';
const {accountStatus} = enums;
const {ShypCrew} = models;

/*
@TODO validate the user status
*/
const registerUserAsShypCrew = async(req,res) => {
    const {id} = req.loggedInUser;
    let alreadyExist = await findShypcrewByUserId(id);
    if(alreadyExist && alreadyExist.status === accountStatus.ACTIVE)
      return res.status(400).json({message: 'User already registered as shypcrew'})
    req.body.userId =id;
    req.body.id = await uuiSigner()
    let shypcrew;
    try{
        shypcrew = await ShypCrew.create(req.body);
    }catch(error){
        return res.status(400).json({message:'Shypcrew not created', error:'Shypcrew alredy exist'});
    }
    return res.status(201).json({
        message:'Shypcrew registered',
        shypcrew,
        user: req.loggedInUser
    })
}

const findShypcrewByUserId = async(userId) => {
    try{
       let user = await ShypCrew.findOne({where: {userId}});
       if(!user)
        return false;
       return true;
    }
    catch(e){
       return false;
    }
}

const getShypcrews = async(_,res) => {
    let shypcrews = await models.ShypCrew.findAll();
    return res.status(200).json(shypcrews)
}
export {registerUserAsShypCrew, getShypcrews};