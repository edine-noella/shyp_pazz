import express from 'express';
import {getAllParcelRequests, uploadParcel} from '../controllers/parcelController';
const router = express.Router();

router.get('/getAllParcelRequests',getAllParcelRequests);
router.post('/uploadParcel', uploadParcel);

module.exports = router;