class S3Controller {
    constructor(s3Service) {
        this.s3Service = s3Service;
    }

    async uploadFile(req, res) {
        try {
            const { base64Data, folderName, format } = req.body;
            if (!base64Data || !folderName || !format) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            // Extraer el tipo de archivo desde el base64Data
            const matches = base64Data.match(/^data:(.*);base64,/);
            if (!matches || matches.length < 2) {
                return res.status(400).json({ message: 'Invalid base64 format' });
            }
            const fileType = matches[1];

            // Convertir base64 a buffer
            const buffer = Buffer.from(base64Data.replace(/^data:(.*);base64,/, ''), 'base64');

            const bucketName = process.env.S3_BUCKET;
            const key = `${folderName}/${Date.now()}.${format}`;
            
            const result = await this.s3Service.upload(bucketName, key, buffer);
            res.status(200).json({ message: 'File uploaded successfully', data: result, fileType });
            console.log('File uploaded successfully:', result);
        } catch (error) {
            res.status(500).json({ message: 'Error uploading file', error: error.message });
            console.error('Error uploading file:', error);
        }
    }

    async getFile(req, res) {
        try {
            const bucketName = process.env.S3_BUCKET;
            const fileName = req.params.fileName;
            const file = await this.s3Service.get(bucketName, fileName);
            res.status(200).send(file.Body);
            console.log('File retrieved successfully:', file);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving file', error: error.message });
        }
    }

    async deleteFile(req, res) {
        try {
            const bucketName = process.env.S3_BUCKET;
            const fileName = req.params.fileName;
            await this.s3Service.delete(bucketName, fileName);
            res.status(200).json({ message: 'File deleted successfully' });
            console.log('File deleted successfully:', fileName);
        } catch (error) {
            res.status(500).json({ message: 'Error deleting file', error: error.message });
        }
    }
}

module.exports = S3Controller;
