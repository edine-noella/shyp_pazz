import express from 'express';
import {logout, signin, requestResetPassword, signup, findUserByEmail,resetPassword} from '../controllers/userController';
import { isAuthorized } from '../middlewares/authMiddleware';
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/logout', isAuthorized,logout);
router.post('/resetPassword', requestResetPassword);
router.put('/resetPassword/:code', resetPassword);

module.exports = router;