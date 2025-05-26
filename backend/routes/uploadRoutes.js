import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

// Define storage configuration for multer
const storage = multer.diskStorage({
  destination(req, file, cb) {   // Set destination folder for uploaded files
    cb(null, 'uploads/'); // Store in 'uploads/' directory
  },
  // Set filename for uploaded file
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);  // Example: image-1629372938.jpg
  },
});

// Helper function to validate file types (allow only images)
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/; // Allowed extensions
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); // Check file extension
  const mimetype = filetypes.test(file.mimetype); // Check MIME type
  if (extname && mimetype) {
    return cb(null, true); // Valid image
  } else {
    cb('Images only!'); // Reject file
  }
}

// Initialize multer with storage configuration
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb); // Optionally validate file type here
  }
});

// Route: POST /api/upload
// Upload a single image file using the key 'image'
router.post('/', upload.single('image'), (req, res) => {
  res.send({
    message: 'Image uploaded',
    image: `/${req.file.path}`, // Return file path in response
  });
});

export default router;
