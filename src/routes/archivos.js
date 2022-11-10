var express = require('express');
var router = express.Router();
const { subirarchivo } = require('../controllers/archivos');
const { upload } = require('../middlewares/subir-archivos');

router.post('/', upload.single('file'), subirarchivo);

module.exports = router;