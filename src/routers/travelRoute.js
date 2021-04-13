import express from 'express';
import {uploadTravelInfo} from '../controllers/travelController';
const router = express.Router();

router.put('/uploadTravelInfo', uploadTravelInfo);
module.exports = router;