const { S3Client, ListBucketsCommand, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, ListObjectsCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();

class S3Service {
    constructor() {
        this.s3 = new S3Client({ region: process.env.AWS_REGION });
    }

    async checkConnection() {
        try {
            const command = new ListBucketsCommand({});
            const response = await this.s3.send(command);
            console.log('Connected to S3. Buckets:', response.Buckets[1].Name);
            return true;
        } catch (error) {
            console.error('S3 Connection Error:', error);
            throw new Error('Failed to connect to S3');
        }
    }

    async listObjects() {
        try {
            const command = new ListObjectsCommand({ Bucket: 's3rickbucket' });
            const response = await this.s3.send(command);
    
            if (!response.Contents || response.Contents.length === 0) {
                console.log('No objects in the bucket');
                return false;
            } else {
                console.log('Objects in the bucket:', response.Contents);
                return true;
            }
        } catch (error) {
            console.error('S3 Connection Error:', error);
            throw new Error('Failed to connect to S3');
        }
    }
    

    async upload(bucketName, key, body) {
        const command = new PutObjectCommand({ Bucket: bucketName, Key: key, Body: body });
        return await this.s3.send(command);
    }

    async get(bucketName, key) {
        const command = new GetObjectCommand({ Bucket: bucketName, Key: key });
        return await this.s3.send(command);
    }

    async delete(bucketName, key) {
        const command = new DeleteObjectCommand({ Bucket: bucketName, Key: key });
        return await this.s3.send(command);
    }
}

module.exports = S3Service;
