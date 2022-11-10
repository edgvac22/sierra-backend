const multer  = require('multer');

const UPLOAD_DIR = 'C:/Users/Edgardo/OneDrive/Documentos/fesa/proyecto_final/frontend/assets/img/products/';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, UPLOAD_DIR);
                                        },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

module.exports = {
    upload
}