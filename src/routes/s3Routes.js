const express = require('express');
const multer = require('multer');
const S3Controller = require('../controllers/s3Controller');
const S3Service = require('../services/s3Service');

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();
const s3Service = new S3Service();
const s3Controller = new S3Controller(s3Service);

router.post('/uploadFile', upload.single('file'), (req, res) => s3Controller.uploadFile(req, res));
router.get('/getFile/:fileName', (req, res) => s3Controller.getFile(req, res));
router.delete('/deleteFile/:fileName', (req, res) => s3Controller.deleteFile(req, res));
router.get('/listObjects', (req, res) => s3Controller.listObjects(req, res)); // New route added

module.exports = router;