import models from '../database/models';

//store withdraw report
const  uploadWithdraw =  async(req,res) => {
      
    try{
          const created =   await models.WithdrawStatistics.create({
             
            Income:req.body.Income,
            withdrawAmount: req.body.withdrawAmount,
            balance: req.body.balance,
            bankName: req.body.bankName,
            bankLocation:req.body.bankLocation,
            bankAccName: req.body.bankAccName,
            bankAccNumber: req.body.bankAccNumber,
            MomoName: req.body.MomoName,
            MomoLocation: req.body.MomoLocation,
            MomoAccNumber: req.body.MomoAccNumber,
            AmazonMoney: req.body.AmazonMoney
             
        })
  
        return res.status(201).send({msg:"withdraw recorded",created})
  
    }catch (e) {
      console.log(e)
      res.status(500).send(e)
    }
     
    };

//lets get all contracts
const getAllWithdraws = async (req, res) =>{
  try {
    const allWithdraws = await models.WithdrawStatistics.findAll({})
    res.status(201).send(allWithdraws)
  } catch (e) {
    console.log(e)
    res.status(500).send(e)
  }
};

  
  

export{uploadWithdraw ,getAllWithdraws};