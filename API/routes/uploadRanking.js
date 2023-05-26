const express = require('express');
const router = express.Router();
const multer = require('multer');

const { seedRealRanking } = require('../db/seed')

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, '');
  },
  filename: (req, file, callBack) => {
    const fileName = upload.getFilename(file, req.body.year, req.body.category);
    callBack(null, fileName);
  }
});

const fileFilter = (req, file, callBack) => {
  if (file.originalname.endsWith('.xlsx')) {
    callBack(null, true);
  } else {
    callBack(new Error('Molim vas uploadajte datoteku s .xlsx proširenjem.'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post('/', (req, res, next) => {
  const year = req.body.year;
  const category = req.body.category;

  upload.getFilename = (file, year, category) => {
    return category + 'Real' + year + '.xlsx';
  };

  upload.singleDynamic = (fieldName) => {
    return (req, res, next) => {
      upload.single(fieldName)(req, res, () => {
        next();
      });
    };
  };

  upload.singleDynamic('file')(req, res, next);
}, async(req, res) => {

  await seedRealRanking();
  res.status(200).json({ message: 'Uspješna objava datoteke.' });
});

module.exports = router;







