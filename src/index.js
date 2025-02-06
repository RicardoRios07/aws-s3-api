const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');  // Add this line
const s3Routes = require('./routes/s3Routes');
const S3Service = require('./services/s3Service');

dotenv.config();
const app = express();
const s3Service = new S3Service();

// Enable CORS
app.use(cors({
    origin: '*',  // Allow all origins
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],  // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization']  // Allowed headers
}));

app.use(express.json());
app.use('/api/s3', s3Routes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, async () => {
    try {
        await s3Service.checkConnection();
        await s3Service.listObjects();
        console.log(`Server running on port ${PORT}`);
    } catch (error) {
        console.error('Startup Error:', error);
    }
});