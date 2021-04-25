import express from 'express';
import {getAllParcels, uploadParcel} from '../controllers/parcelController';
const router = express.Router();

router.get('/getAllParcels',getAllParcels);
router.post('/uploadParcel', uploadParcel);

module.exports = router;