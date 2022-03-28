import express from 'express';
import {getFile } from '../../controllers/file';
import {uploadFile} from '../../controllers/file';
const router = express.Router();

router.get('/getFiles/:filename',getFile);
router.post('/uploadFile',uploadFile);

module.exports = router;