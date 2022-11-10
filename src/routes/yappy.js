const { check } = require('express-validator');
const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');
const { yappyCarga } = require('../controllers/yappy');

const router = Router();

router.post('/', [
                    check('ptotal', 'El total es obligatorio').not().isEmpty(),
                    check('psubtotal', 'El subtotal es obligatorio').not().isEmpty(),
                    check('pshipping', 'El envio es obligatorio').not().isEmpty(),
                    check('pdiscount', 'El descuento es obligatorio').not().isEmpty(),
                    check('ptaxes', 'El impuesto es obligatorio').not().isEmpty(),
                    check('porderId', 'El id de orden es obligatorio').not().isEmpty(),
                    check('ptelefono', 'El telefono es obligatorio').not().isEmpty(),
                    validarCampos,
                ],yappyCarga);

module.exports = router;