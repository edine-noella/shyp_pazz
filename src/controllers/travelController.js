import models from '../database/models';

//creating a travel information
const  uploadTravelInfo =  async(req,res) => {
      
  try{
        const created =   await models.travel_information.create({
            // id: uuiSigner(),
            src_place:req.body.src_place,
            dest_place:req.body.dest_place,
            src_country:req.body.src_country,
            dest_country:req.body.dest_country,
            departure_time:req.body.departure_time,
            departure_date:req.body.departure_date,
            transport_mode:req.body.transport_mode,
            space_avai:req.body.space_avai,
            ticket:req.body.ticket,
            price_dist:req.body.price_dist,
            add_costs:req.body.add_costs,
            terms:req.body.terms,
            shypment_category:req.body.shypment_category
      })

      return res.status(201).send(created).json({
        message: 'travel information aploaded'
       })

  }catch (e) {
    console.log(e)
    res.status(500).send(e)
  }
   
  };



//update at a specified id
  const update =  async(req,res) => {   
   
  try{
  
    const temp = await models.travel_information.findOne(
       
      { where: { id: req.params.infoId} }
         

       )

       if (temp) {

         const updated= await models.travel_information.update({
          src_place:req.body.src_place,
          dest_place:req.body.dest_place,
          src_country:req.body.src_country,
          dest_country:req.body.dest_country,
          departure_time:req.body.departure_time,
          departure_date:req.body.departure_date,
          transport_mode:req.body.transport_mode,
          space_avai:req.body.space_avai,
          ticket:req.body.ticket,
          price_dist:req.body.price_dist,
          add_costs:req.body.add_costs,
          terms:req.body.terms,
          shypment_category:req.body.shypment_category
        }, { where: { id: req.params.infoId} , returning: true,
        plain: true})
        
        
        res.status(201).send({msg:"travel information updated",updated})

      } else {
        res.status(404).send("travel information not found Not Found")
      }

    } catch (e) {
      console.log(e)
      res.status(500).send(e)
    }

    }; 


    //deleting treavel information by id
    const deletion = async(req, res) => {
      try{

      const tem = await models.travel_information.findOne(

         { where: { id: req.params.infoId} }
       )

       if(tem){

  const deleted= await models.travel_information.destroy({
    where: { id:req.params.infoId },
    
  })
  
 
  res.status(200).send({msg:"travel information deleted !!!"})
}else{
  res.status(404).send("travel information not found")
}
    
      } catch (e) {
        console.log(e)
        res.status(500).send(e)
      }
    
    };
      

    const getAll = async (req, res) =>{
      try {
        const allTravelInfo = await models.travel_information.findAll({})
        res.status(201).send(allTravelInfo)
      } catch (e) {
        console.log(e)
        res.status(500).send(e)
      }
    };
  


  export{uploadTravelInfo,update,deletion,getAll};