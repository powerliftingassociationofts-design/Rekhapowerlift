const { S3Client } = require('@aws-sdk/client-s3');
require('dotenv').config();

// Initialize S3 Client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// S3 Configuration
const s3Config = {
  bucketName: process.env.AWS_S3_BUCKET_NAME || 'rekhapowerlift-bucket',
  region: process.env.AWS_REGION || 'us-east-1',
  acl: 'public-read', // or 'private' depending on your needs
};

module.exports = { s3Client, s3Config };
