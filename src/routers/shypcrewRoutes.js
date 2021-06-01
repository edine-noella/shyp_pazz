import express from 'express';
import { getShypcrews, registerUserAsShypCrew } from '../controllers/shypcrewController';
import { isAuthorized } from '../middlewares/authMiddleware';
const router = express.Router();

router.post('',isAuthorized, registerUserAsShypCrew);
router.get('', getShypcrews);

module.exports = router;