const { check } = require('express-validator');
const { Router } = require('express');
const { buscarSuscripcion, crearSuscripcion } = require('../controllers/suscripcion');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', buscarSuscripcion);

router.post('/', [
                    check('email', 'El email es obligatorio').isEmail(),
                    validarCampos,
                ], crearSuscripcion);

module.exports = router;