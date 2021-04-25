import models from '../database/models';

//store requested parcels
const  uploadParcel =  async(req,res) => {
      
    try{
          const created =   await models.parcel_req.create({
              // id: uuiSigner(),
              package_category:req.body.package_category,
              package_type:req.body.package_type,
              package_name:req.body.package_name,
              weight:req.body.weight,
              image:req.body.image,
              src_address:req.body.src_address,
              dest_address:req.body.dest_address,
              departure_time:req.body.departure_time,
              arrival_time:req.body.arrival_time,
              transport_mode:req.body.transport_mode,
              user_id:req.body.user_id
             
        })
  
        return res.status(201).send({msg:"parcel requested stored",created})
  
    }catch (e) {
      console.log(e)
      res.status(500).send(e)
    }
     
    };

//lets get store parcel request
const getAllParcels = async (req, res) =>{
  try {
    const allParcels = await models.parcel_req.findAll({})
    res.status(201).send(allParcels)
  } catch (e) {
    console.log(e)
    res.status(500).send(e)
  }
};

  
  

export{uploadParcel,getAllParcels};