import express from 'express';
import {logout, signin} from '../controllers/userController';
import { isAuthorized } from '../middlewares/authMiddleware';
const router = express.Router();

router.post('/signin', signin);
router.get('/logout', isAuthorized,logout)
module.exports = router;