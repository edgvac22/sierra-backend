const { check } = require('express-validator');
const { Router } = require('express');
const { crearPedidos, buscarPedidos, buscarPedido } = require('../controllers/pedidos');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', buscarPedidos);

router.get('/usuario/',  [
                            check('email', 'El email es obligatorio').isEmail(),
                            validarCampos,
                        ],buscarPedido);

router.post('/', [
                    check('pedido', 'El numero de pedido es obligatorio').not().isEmpty(),
                    check('fecha', 'La fecha es obligatorio').not().isEmpty(),
                    check('email', 'El email es obligatorio').isEmail(),
                    check('metodo_pago', 'El metodo de pago es obligatorio').not().isEmpty(),
                    check('metodo_envio', 'El metodo de envio es obligatorio').not().isEmpty(),
                    check('subtotal', 'El subtotal es obligatorio').not().isEmpty(),
                    check('itbm', 'El itbm es obligatorio').not().isEmpty(),
                    check('flete', 'El flete es obligatorio').not().isEmpty(),
                    check('total', 'El gran total es obligatorio').not().isEmpty(),
                    check('articulos', 'Los articulos son obligatorio').not().isEmpty(),
                    validarCampos,
                ], crearPedidos);

module.exports = router;