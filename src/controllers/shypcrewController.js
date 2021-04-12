import models from '../database/models';

const  uploadTravelInfo =  async(req,res) => {
    const { src_country, dest_country,src_place,dest_place,departure_time,departure_date,
        transport_mode,space_avai,ticket,price_dist,add_costs,terms,shypment_category} = req.body;
  
     if(shypment_category=='international'){
    
       let newTravelInfo =  await models.shypcrew.create({
            id: uuiSigner(),
            src_country,
            dest_country,
            departure_time,
            departure_date,
            transport_mode,
            space_avai,ticket,price_dist,add_costs,terms,shypment_category
      })
    }else{
        let newTravelInfo =  await models.shypcrew.create({
            id: uuiSigner(),
            src_place,
            dest_place,
            departure_time,
            departure_date,
            transport_mode,
            space_avai,ticket,price_dist,add_costs,terms,shypment_category
      })
       
      return res.status(201).json({
        message: 'travel information aploaded'
       
      })

    }
   
  };


  export{uploadTravelInfo};