import express from 'express';
import {deletion, getAll, update, uploadTravelInfo} from '../controllers/travelController';
const router = express.Router();

router.post('/uploadTravelInfo', uploadTravelInfo);
router.put('/update/:infoId',update);
router.delete('/delete/:infoId',deletion);
router.get('/getAll',getAll);
module.exports = router;