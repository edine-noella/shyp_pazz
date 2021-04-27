import express from 'express';
import { registerUserAsShypCrew } from '../controllers/shypcrewController';
import { isAuthorized } from '../middlewares/authMiddleware';
const router = express.Router();

router.post('',isAuthorized, registerUserAsShypCrew);

module.exports = router;