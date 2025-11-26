#!/usr/bin/env node

/**
 * AWS S3 Connection Test Script
 * This script tests your AWS S3 connection and bucket access
 */

require('dotenv').config();
const { S3Client, ListBucketsCommand, ListObjectsV2Command, HeadBucketCommand } = require('@aws-sdk/client-s3');

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

async function testS3Connection() {
  log('\n🔍 Testing AWS S3 Connection...\n', colors.blue);

  // Check environment variables
  log('Step 1: Checking Environment Variables', colors.yellow);
  const requiredVars = ['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'AWS_REGION', 'AWS_S3_BUCKET_NAME'];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    log(`❌ Missing environment variables: ${missingVars.join(', ')}`, colors.red);
    log('\nPlease update server/.env file with your AWS credentials:', colors.yellow);
    log('  AWS_ACCESS_KEY_ID=your_access_key');
    log('  AWS_SECRET_ACCESS_KEY=your_secret_key');
    log('  AWS_REGION=us-east-1 (or your bucket region)');
    log('  AWS_S3_BUCKET_NAME=your-bucket-name\n');
    process.exit(1);
  }

  log('✅ All required environment variables are set', colors.green);
  log(`   Region: ${process.env.AWS_REGION}`);
  log(`   Bucket: ${process.env.AWS_S3_BUCKET_NAME}`);
  log(`   Access Key: ${process.env.AWS_ACCESS_KEY_ID.substring(0, 8)}...`);

  // Initialize S3 Client
  log('\nStep 2: Initializing S3 Client', colors.yellow);
  const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
  log('✅ S3 Client initialized', colors.green);

  // Test listing all buckets
  log('\nStep 3: Listing All Available Buckets', colors.yellow);
  try {
    const listBucketsCommand = new ListBucketsCommand({});
    const bucketsResponse = await s3Client.send(listBucketsCommand);
    
    if (bucketsResponse.Buckets && bucketsResponse.Buckets.length > 0) {
      log(`✅ Found ${bucketsResponse.Buckets.length} bucket(s):`, colors.green);
      bucketsResponse.Buckets.forEach((bucket, index) => {
        const isTargetBucket = bucket.Name === process.env.AWS_S3_BUCKET_NAME;
        const marker = isTargetBucket ? '👉' : '  ';
        const color = isTargetBucket ? colors.blue : colors.reset;
        log(`${marker} ${index + 1}. ${bucket.Name} (Created: ${bucket.CreationDate})`, color);
      });
    } else {
      log('⚠️  No buckets found in your AWS account', colors.yellow);
    }
  } catch (error) {
    log(`❌ Failed to list buckets: ${error.message}`, colors.red);
    if (error.Code === 'InvalidAccessKeyId') {
      log('   → Check your AWS_ACCESS_KEY_ID', colors.red);
    } else if (error.Code === 'SignatureDoesNotMatch') {
      log('   → Check your AWS_SECRET_ACCESS_KEY', colors.red);
    }
    process.exit(1);
  }

  // Test access to specific bucket
  log(`\nStep 4: Testing Access to Target Bucket`, colors.yellow);
  try {
    const headBucketCommand = new HeadBucketCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
    });
    await s3Client.send(headBucketCommand);
    log(`✅ Successfully connected to bucket: ${process.env.AWS_S3_BUCKET_NAME}`, colors.green);
  } catch (error) {
    log(`❌ Failed to access bucket: ${error.message}`, colors.red);
    if (error.Code === 'NoSuchBucket') {
      log(`   → Bucket "${process.env.AWS_S3_BUCKET_NAME}" does not exist`, colors.red);
      log('   → Check your AWS_S3_BUCKET_NAME in .env file', colors.yellow);
    } else if (error.Code === 'Forbidden') {
      log('   → Your IAM user does not have permission to access this bucket', colors.red);
      log('   → Add AmazonS3FullAccess or similar policy to your IAM user', colors.yellow);
    }
    process.exit(1);
  }

  // List contents of the bucket
  log('\nStep 5: Listing Bucket Contents', colors.yellow);
  try {
    const listObjectsCommand = new ListObjectsV2Command({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      MaxKeys: 10,
    });
    const objectsResponse = await s3Client.send(listObjectsCommand);
    
    if (objectsResponse.Contents && objectsResponse.Contents.length > 0) {
      log(`✅ Found ${objectsResponse.KeyCount} file(s) in bucket (showing first 10):`, colors.green);
      objectsResponse.Contents.forEach((obj, index) => {
        const sizeMB = (obj.Size / (1024 * 1024)).toFixed(2);
        log(`   ${index + 1}. ${obj.Key} (${sizeMB} MB)`);
      });
      if (objectsResponse.KeyCount < objectsResponse.Contents.length) {
        log(`   ... and ${objectsResponse.Contents.length - objectsResponse.KeyCount} more files`);
      }
    } else {
      log('ℹ️  Bucket is empty (no files uploaded yet)', colors.yellow);
    }
  } catch (error) {
    log(`❌ Failed to list bucket contents: ${error.message}`, colors.red);
    process.exit(1);
  }

  // Success summary
  log('\n' + '='.repeat(60), colors.green);
  log('✅ AWS S3 CONNECTION SUCCESSFUL!', colors.green);
  log('='.repeat(60), colors.green);
  log('\nYour S3 bucket is properly configured and accessible.', colors.green);
  log('You can now start the server and use S3 endpoints.\n', colors.green);
  log('Start server with: cd server && npm start\n', colors.blue);
}

// Run the test
testS3Connection().catch(error => {
  log(`\n❌ Unexpected error: ${error.message}`, colors.red);
  console.error(error);
  process.exit(1);
});
