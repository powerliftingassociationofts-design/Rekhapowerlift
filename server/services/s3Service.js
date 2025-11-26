const { 
  PutObjectCommand, 
  GetObjectCommand, 
  DeleteObjectCommand, 
  ListObjectsV2Command,
  HeadObjectCommand 
} = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { s3Client, s3Config } = require('../config/s3Config');

/**
 * Upload file to S3
 * @param {Buffer} fileBuffer - File buffer
 * @param {string} fileName - Name of the file
 * @param {string} mimeType - MIME type of the file
 * @param {string} folder - Optional folder path in bucket
 * @returns {Promise<object>} Upload result
 */
const uploadToS3 = async (fileBuffer, fileName, mimeType, folder = '') => {
  try {
    const key = folder ? `${folder}/${fileName}` : fileName;
    
    const command = new PutObjectCommand({
      Bucket: s3Config.bucketName,
      Key: key,
      Body: fileBuffer,
      ContentType: mimeType,
      ACL: s3Config.acl,
    });

    await s3Client.send(command);

    const fileUrl = `https://${s3Config.bucketName}.s3.${s3Config.region}.amazonaws.com/${key}`;
    
    return {
      success: true,
      message: 'File uploaded successfully',
      url: fileUrl,
      key: key,
      bucket: s3Config.bucketName,
    };
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw error;
  }
};

/**
 * Get file from S3
 * @param {string} key - File key in S3
 * @returns {Promise<object>} File stream
 */
const getFromS3 = async (key) => {
  try {
    const command = new GetObjectCommand({
      Bucket: s3Config.bucketName,
      Key: key,
    });

    const response = await s3Client.send(command);
    return response.Body;
  } catch (error) {
    console.error('Error getting file from S3:', error);
    throw error;
  }
};

/**
 * Delete file from S3
 * @param {string} key - File key in S3
 * @returns {Promise<object>} Delete result
 */
const deleteFromS3 = async (key) => {
  try {
    const command = new DeleteObjectCommand({
      Bucket: s3Config.bucketName,
      Key: key,
    });

    await s3Client.send(command);
    
    return {
      success: true,
      message: 'File deleted successfully',
      key: key,
    };
  } catch (error) {
    console.error('Error deleting from S3:', error);
    throw error;
  }
};

/**
 * List files in S3 bucket
 * @param {string} prefix - Optional prefix to filter files
 * @returns {Promise<Array>} List of files
 */
const listS3Files = async (prefix = '') => {
  try {
    const command = new ListObjectsV2Command({
      Bucket: s3Config.bucketName,
      Prefix: prefix,
    });

    const response = await s3Client.send(command);
    
    return {
      success: true,
      files: response.Contents || [],
      count: response.KeyCount || 0,
    };
  } catch (error) {
    console.error('Error listing S3 files:', error);
    throw error;
  }
};

/**
 * Generate presigned URL for temporary access
 * @param {string} key - File key in S3
 * @param {number} expiresIn - URL expiration time in seconds (default: 3600)
 * @returns {Promise<string>} Presigned URL
 */
const getPresignedUrl = async (key, expiresIn = 3600) => {
  try {
    const command = new GetObjectCommand({
      Bucket: s3Config.bucketName,
      Key: key,
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn });
    return url;
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    throw error;
  }
};

/**
 * Check if file exists in S3
 * @param {string} key - File key in S3
 * @returns {Promise<boolean>} True if file exists
 */
const fileExists = async (key) => {
  try {
    const command = new HeadObjectCommand({
      Bucket: s3Config.bucketName,
      Key: key,
    });

    await s3Client.send(command);
    return true;
  } catch (error) {
    if (error.name === 'NotFound') {
      return false;
    }
    throw error;
  }
};

module.exports = {
  uploadToS3,
  getFromS3,
  deleteFromS3,
  listS3Files,
  getPresignedUrl,
  fileExists,
};
