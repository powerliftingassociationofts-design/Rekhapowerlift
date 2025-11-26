const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

// Import S3 service
const {
  uploadToS3,
  getFromS3,
  deleteFromS3,
  listS3Files,
  getPresignedUrl,
  fileExists,
} = require('./services/s3Service');

const app = express();
const PORT = process.env.PORT || 5000;

// Multer configuration for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept images, PDFs, and documents
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|xls|xlsx/;
    const extname = allowedTypes.test(file.originalname.toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images, PDFs, and documents are allowed.'));
    }
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email provider
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});

// Send email endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, phone, address, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'All required fields must be filled' 
      });
    }

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'powerliftingassociationofts@gmail.com', // WPC Telangana email
      subject: 'New Contact Form Submission - WPC Telangana',
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><em>This message was sent from the WPC Telangana website contact form.</em></p>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent:', info.messageId);
    res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully' 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send email' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running!' });
});

// ==================== AWS S3 ENDPOINTS ====================

/**
 * Upload single file to S3
 * POST /api/s3/upload
 * Body: form-data with 'file' field and optional 'folder' field
 */
app.post('/api/s3/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    const folder = req.body.folder || 'uploads';
    const fileName = `${Date.now()}-${req.file.originalname}`;

    const result = await uploadToS3(
      req.file.buffer,
      fileName,
      req.file.mimetype,
      folder
    );

    res.status(200).json(result);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload file',
      error: error.message,
    });
  }
});

/**
 * Upload multiple files to S3
 * POST /api/s3/upload-multiple
 * Body: form-data with 'files' field and optional 'folder' field
 */
app.post('/api/s3/upload-multiple', upload.array('files', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded',
      });
    }

    const folder = req.body.folder || 'uploads';
    const uploadPromises = req.files.map((file) => {
      const fileName = `${Date.now()}-${file.originalname}`;
      return uploadToS3(file.buffer, fileName, file.mimetype, folder);
    });

    const results = await Promise.all(uploadPromises);

    res.status(200).json({
      success: true,
      message: `${results.length} files uploaded successfully`,
      files: results,
    });
  } catch (error) {
    console.error('Multiple upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload files',
      error: error.message,
    });
  }
});

/**
 * Get presigned URL for file
 * GET /api/s3/presigned-url/:key
 * Query params: expiresIn (optional, default: 3600 seconds)
 */
app.get('/api/s3/presigned-url/:key(*)', async (req, res) => {
  try {
    const key = req.params.key;
    const expiresIn = parseInt(req.query.expiresIn) || 3600;

    const url = await getPresignedUrl(key, expiresIn);

    res.status(200).json({
      success: true,
      url: url,
      expiresIn: expiresIn,
    });
  } catch (error) {
    console.error('Presigned URL error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate presigned URL',
      error: error.message,
    });
  }
});

/**
 * Delete file from S3
 * DELETE /api/s3/delete/:key
 */
app.delete('/api/s3/delete/:key(*)', async (req, res) => {
  try {
    const key = req.params.key;
    const result = await deleteFromS3(key);

    res.status(200).json(result);
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete file',
      error: error.message,
    });
  }
});

/**
 * List files in S3 bucket
 * GET /api/s3/list
 * Query params: prefix (optional)
 */
app.get('/api/s3/list', async (req, res) => {
  try {
    const prefix = req.query.prefix || '';
    const result = await listS3Files(prefix);

    res.status(200).json(result);
  } catch (error) {
    console.error('List files error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to list files',
      error: error.message,
    });
  }
});

/**
 * Check if file exists
 * GET /api/s3/exists/:key
 */
app.get('/api/s3/exists/:key(*)', async (req, res) => {
  try {
    const key = req.params.key;
    const exists = await fileExists(key);

    res.status(200).json({
      success: true,
      exists: exists,
      key: key,
    });
  } catch (error) {
    console.error('File exists check error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check file existence',
      error: error.message,
    });
  }
});

// ==================== END S3 ENDPOINTS ====================

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;