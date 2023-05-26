const multer = require('multer');

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Create a multer instance with the storage configuration
const upload = multer({ storage: storage });




const uploadRanking = async (req, res)=>{
  // Check the file name
  console.log(req.data)
  if (req.file && req.file.originalname.endsWith('.xlsx')) {
    // File name ends with '.xlsx', process the file
    res.status(200).json({ message: 'File uploaded successfully.' });
  } else {
    // File name does not end with '.xlsx', delete the file
    if (req.file) {
      // Delete the invalid file
      fs.unlinkSync(req.file.path);
    }
    res.status(400).json({ error: 'Invalid file format. Please upload a file with a .xlsx extension.' });
  }
}

module.exports = { uploadRanking }