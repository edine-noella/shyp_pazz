import {hashPassword,verifyPassword} from '../utils/argon.util';
import models from '../database/models';

const signin = async(req,res) => {
    const {email,password} = req.body;
    let user;
    try{
     user = await models.TestUser.findOne({where: {email}})
     if(!user)
      return res.status(401).json({message: "Invalid email or password"});
     }
    catch(e){
      console.log("Error: "+e);
      return res.status(401).json({message: "Invalid email or password"});
    }
    const isPasswordValid = await verifyPassword(user.password, password);
    if(!isPasswordValid)
      return res.status(401).json({message: "Invalid email or password"});
    return res.status(200).json({message: "authorized", user});
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
    .then((user) => {
      if (user) {
        return res.status(409).json({
          message: 'Email already registered',
        });
      }
      models.User.create({
        name: req.body.name,
        phone: req.body.phone || '',
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        userType: req.body.userType,
        country: req.body.country
  })
  return res.status(201).json({message: 'user registered', User: req.body})
     
    })
    .catch((error) => res.status(400).json(error.message));
};

export {signin,signup};

