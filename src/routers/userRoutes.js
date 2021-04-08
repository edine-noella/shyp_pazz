import express from 'express';
import {logout, signin, requestResetPassword} from '../controllers/userController';
import { isAuthorized } from '../middlewares/authMiddleware';
const router = express.Router();

router.post('/signin', signin);
router.get('/logout', isAuthorized,logout);
router.post('/resetPassword', requestResetPassword);
module.exports = router;