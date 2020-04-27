const multer = require('multer');
const path = require('path');

// Set image storage options
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/blogs/' + new Date().getFullYear() + '/');
  },
  filename: function (req, file, cb) {
    cb(null, 'blog_' + file.originalname);
  }
});

// Set a filter for types of files that will be accepted
const fileFilter = (req, file, cb) => {
  // Allowe file types
  const fileTypes = /jpeg|jpg|png|gif/;

  // Check the file extention
  const extentionType = fileTypes.test(path.extname(file.originalname).toLowerCase());

  // Check mimetype
  const mimeType = fileTypes.test(file.mimetype);

  // Test file for allowed types
  if (extentionType && mimeType) {
    return cb(null, true);
  } else {
    cb('Error: Images only', false);
  }
};

// Initial upload settings
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 // 1 MB
  },
  fileFilter: fileFilter
}).single('image');
