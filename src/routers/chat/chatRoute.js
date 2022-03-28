import express from 'express';
import {getChats } from '../../controllers/chat'
import {searchChats} from '../../controllers/chat'
const router = express.Router();

router.get('/getChats/:userid',getChats);
router.get('/search',searchChats);

module.exports = router;