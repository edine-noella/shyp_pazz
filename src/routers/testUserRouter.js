import express from 'express';
import {createUser} from '../controllers/TestUserController';

const router  = express.Router();

router.post('', createUser);

module.exports  = router;