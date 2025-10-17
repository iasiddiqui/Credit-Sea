const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadController = require('../controllers/upload.controller');

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(xml)$/i)) return cb(new Error('Only XML files allowed'), false);
    cb(null, true);
  }
});

// accept any field name
router.post('/upload', upload.any(), uploadController.uploadXml);
router.get('/', uploadController.listReports);
router.get('/:id', uploadController.getReportById);

module.exports = router;
