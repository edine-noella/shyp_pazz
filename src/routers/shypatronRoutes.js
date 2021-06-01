import express from 'express';
import { getShypatrons, registerUserAsShypatron } from '../controllers/shypatronController';
import {isAuthorized} from '../middlewares/authMiddleware';
const router = express.Router();

router.post('/',isAuthorized, registerUserAsShypatron);
router.get('/', getShypatrons);
module.exports = router;