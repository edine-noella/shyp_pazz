import express from 'express';
import {signin} from '../controllers/userController';
const router = express.Router();

router.post('/signin', signin);
module.exports = router;