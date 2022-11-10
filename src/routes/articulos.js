const { check } = require('express-validator');
const { Router } = require('express');
const { buscarArticulos, buscarArticulo, crearArticulo, actualizarArticulo, borrarArticulo } = require('../controllers/articulos');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

        router.get('/all/', buscarArticulos);

        router.get('/', buscarArticulo);

        router.post('/', [
                                    check('codigo', 'El codigo del articulo es obligatorio').not().isEmpty(),
                                    check('nombre', 'El nombre del articulo es obligatorio').not().isEmpty(),
                                    check('descripcion', 'La descripcion del articulo es obligatoria').not().isEmpty(),
                                    check('empaque', 'El empaque del articulo es obligatorio').not().isEmpty(),
                                    check('precio', 'El precio del articulo es obligatorio').not().isEmpty(),
                                    check('precio_oferta', 'El precio de oferta del articulo es obligatorio').not().isEmpty(),
                                    check('categoria', 'La categoria del articulo es obligatoria').not().isEmpty(),
                                    check('marca', 'La marca del articulo es obligatoria').not().isEmpty(),
                                    check('inventario', 'El inventario del articulo es obligatoria').not().isEmpty(),
                                    check('imagen', 'La imagen del articulo es obligatoria').not().isEmpty(),
                                    validarCampos,
                        ], crearArticulo);

        router.put('/', [
                                    check('nombre', 'El nombre del articulo es obligatorio').not().isEmpty(),
                                    check('descripcion', 'La descripcion del articulo es obligatoria').not().isEmpty(),
                                    check('empaque', 'El empaque del articulo es obligatorio').not().isEmpty(),
                                    check('precio', 'El precio del articulo es obligatorio').not().isEmpty(),
                                    check('precio_oferta', 'El precio de oferta del articulo es obligatorio').not().isEmpty(),
                                    check('categoria', 'La categoria del articulo es obligatoria').not().isEmpty(),
                                    check('marca', 'La marca del articulo es obligatoria').not().isEmpty(),
                                    check('inventario', 'El inventario del articulo es obligatoria').not().isEmpty(),
                                    check('imagen', 'La imagen del articulo es obligatoria').not().isEmpty(),
                                    validarCampos,
                            ], actualizarArticulo);

        router.delete('/', borrarArticulo);

module.exports = router;