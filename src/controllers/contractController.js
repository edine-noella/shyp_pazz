import models from '../database/models';

//store requested parcels
const  uploadContractForParcel =  async(req,res) => {
      
    try{
          const created =   await models.Contract.create({
              // lets now hard code user id but later we will get the id directly trought the user singed in session
              package_category:req.body.package_category,
              user_id:req.body.user_id,
              parcel_id:req.body.parcel_id,
              //later we will apload the file to the server and only keep its location on the server in the database
              pathe:req.body.path
             
        })
  
        return res.status(201).send({msg:"contract uploaded",created})
  
    }catch (e) {
      console.log(e)
      res.status(500).send(e)
    }
     
    };

//lets get all contracts
const getAllContracts = async (req, res) =>{
  try {
    const allContracts= await models.Contract.findAll({})
    res.status(201).send(allContracts)
  } catch (e) {
    console.log(e)
    res.status(500).send(e)
  }
};

  
  

export{uploadContractForParcel ,getAllContracts};