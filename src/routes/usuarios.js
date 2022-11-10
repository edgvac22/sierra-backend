const { check } = require('express-validator');
const { Router } = require('express');
const { buscarUsuarios, buscarUsuario, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', buscarUsuarios);

router.post('/one/', buscarUsuario);

router.post('/', [
                    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
                    check('password', 'El password es obligatorio').not().isEmpty(),
                    check('email', 'El email es obligatorio').isEmail(),
                    check('direccion', 'La direccion es obligatorio').not().isEmpty(),
                    check('telefono', 'El telefono es obligatorio').not().isEmpty(),
                    check('role', 'El role es obligatorio').not().isEmpty(),
                    validarCampos,
                ], crearUsuario);

router.put('/', [
                    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
                    check('password', 'El password es obligatorio').not().isEmpty(),
                    check('direccion', 'La direccion es obligatorio').not().isEmpty(),
                    check('telefono', 'El telefono es obligatorio').not().isEmpty(),
                    check('role', 'El role es obligatorio').not().isEmpty(),
                    validarCampos,
                ], actualizarUsuario);

router.delete('/', [check('email', 'El email es obligatorio').isEmail(), validarCampos,],borrarUsuario);


module.exports = router;