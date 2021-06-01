import express from 'express';
import { uploadContractForParcel ,getAllContracts } from '../controllers/contractController';

const router = express.Router();

router.post('/uploadContract',uploadContractForParcel);
router.get('/getAllContracts', getAllContracts);
module.exports = router;