import express from 'express';
import {uploadWithdraw ,getAllWithdraws } from '../controllers/withdrawStaticController';

const router = express.Router();

router.post('/recordWithdraw',uploadWithdraw);
router.get('/getAllwithdraws', getAllWithdraws);
module.exports = router;