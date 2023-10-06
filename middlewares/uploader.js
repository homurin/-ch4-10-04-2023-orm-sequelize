const multer = require("multer");

const multerFiltering = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    return cb("invalid file extension");
  }
};

const upload = multer({
  fileFilter: multerFiltering,
});

module.exports = upload;
