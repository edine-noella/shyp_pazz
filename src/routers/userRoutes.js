import express from 'express';
import {signin,signup} from '../controllers/userController';
const router = express.Router();

router.post('/signin', signin);
router.post('/signup',signup);
module.exports = router;