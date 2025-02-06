const express = require('express');
const multer = require('multer');
const S3Controller = require('../controllers/s3Controller');
const S3Service = require('../services/s3Service');

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();
const s3Service = new S3Service();
const s3Controller = new S3Controller(s3Service);

router.post('/uploadFile', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const { folderName } = req.body;
    const file = req.file;

    const bucketName = process.env.S3_BUCKET;
    const key = `${folderName}/${Date.now()}.${file.originalname.split('.').pop()}`; // Use original filename extension

    s3Service.upload(bucketName, key, file.buffer) // Use file.buffer
        .then(result => res.status(200).json({ message: 'File uploaded successfully', data: result }))
        .catch(error => {
            console.error('Upload error:', error);
            res.status(500).json({ message: 'Error uploading file', error: error.message });
        });
});

router.get('/getFile/:fileName', (req, res) => s3Controller.getFile(req, res));
router.delete('/deleteFile/:fileName', (req, res) => s3Controller.deleteFile(req, res));
router.get('/listObjects', (req, res) => s3Controller.listObjects(req, res)); // New route added

module.exports = router;