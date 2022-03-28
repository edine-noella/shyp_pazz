import express from 'express';
import { getMessages } from '../../controllers/message';
import {sendMessage } from '../../controllers/message';

const router = express.Router();

router.post('/sendMessage/:chat_id',sendMessage);
router.get('/Usermessages/:chat_id',getMessages);


module.exports = router;