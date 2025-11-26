#!/usr/bin/env node

/**
 * Upload All Images to S3
 * This script uploads all images from the public/images directory to S3
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { uploadToS3 } = require('./services/s3Service');

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

async function uploadDirectory(dirPath, s3Prefix = '') {
  const stats = {
    total: 0,
    uploaded: 0,
    failed: 0,
    skipped: 0,
  };

  async function processDirectory(currentPath, currentPrefix) {
    const items = fs.readdirSync(currentPath);

    for (const item of items) {
      const itemPath = path.join(currentPath, item);
      const itemStat = fs.statSync(itemPath);

      if (itemStat.isDirectory()) {
        // Recursively process subdirectories
        await processDirectory(itemPath, `${currentPrefix}${item}/`);
      } else if (itemStat.isFile()) {
        // Check if it's an image or PDF
        const ext = path.extname(item).toLowerCase();
        const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.svg', '.pdf'];
        
        if (validExtensions.includes(ext)) {
          stats.total++;
          
          const fileBuffer = fs.readFileSync(itemPath);
          const s3Key = `${currentPrefix}${item}`;
          
          // Determine MIME type
          const mimeTypes = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.gif': 'image/gif',
            '.webp': 'image/webp',
            '.avif': 'image/avif',
            '.svg': 'image/svg+xml',
            '.pdf': 'application/pdf',
          };
          const mimeType = mimeTypes[ext] || 'application/octet-stream';

          try {
            log(`Uploading: ${s3Key}...`, colors.yellow);
            await uploadToS3(fileBuffer, item, mimeType, currentPrefix.slice(0, -1));
            stats.uploaded++;
            log(`✅ Uploaded: ${s3Key}`, colors.green);
          } catch (error) {
            stats.failed++;
            log(`❌ Failed: ${s3Key} - ${error.message}`, colors.red);
          }
        } else {
          stats.skipped++;
        }
      }
    }
  }

  await processDirectory(dirPath, s3Prefix);
  return stats;
}

async function main() {
  log('\n📦 Uploading Images to S3 Bucket: ' + process.env.AWS_S3_BUCKET_NAME, colors.blue);
  log('Region: ' + process.env.AWS_REGION, colors.blue);
  log('='.repeat(60) + '\n', colors.blue);

  const imageDirs = [
    { local: '../public/images', s3: 'images/' },
    { local: '../build/images', s3: 'images/' },
  ];

  let totalStats = {
    total: 0,
    uploaded: 0,
    failed: 0,
    skipped: 0,
  };

  for (const { local, s3 } of imageDirs) {
    const fullPath = path.join(__dirname, local);
    
    if (fs.existsSync(fullPath)) {
      log(`\n📁 Processing: ${fullPath}`, colors.yellow);
      const stats = await uploadDirectory(fullPath, s3);
      
      totalStats.total += stats.total;
      totalStats.uploaded += stats.uploaded;
      totalStats.failed += stats.failed;
      totalStats.skipped += stats.skipped;
    } else {
      log(`⚠️  Directory not found: ${fullPath}`, colors.yellow);
    }
  }

  // Summary
  log('\n' + '='.repeat(60), colors.blue);
  log('📊 Upload Summary:', colors.blue);
  log('='.repeat(60), colors.blue);
  log(`Total files found: ${totalStats.total}`);
  log(`✅ Successfully uploaded: ${totalStats.uploaded}`, colors.green);
  log(`❌ Failed: ${totalStats.failed}`, totalStats.failed > 0 ? colors.red : colors.reset);
  log(`⏭️  Skipped: ${totalStats.skipped}`, colors.yellow);
  log('');

  if (totalStats.uploaded > 0) {
    log('🎉 Images are now available in your S3 bucket!', colors.green);
    log(`View them at: https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/`, colors.blue);
  }
}

main().catch(error => {
  log(`\n❌ Error: ${error.message}`, colors.red);
  console.error(error);
  process.exit(1);
});
