const { response } = require('express');
const Articulo = require('../models/articulos');

const buscarArticulos = async (req, res = response) => {

    const desde = Number(req.query.desde) || 0;

    const [articulos, totalArticulos] = await Promise.all([
        Articulo.find().skip(desde).limit(10),
        Articulo.count()
    ])
    res.send({
        ok: true,
        articulos,
        totalArticulos
    });
}

const buscarArticulo = async (req, res = response) => {
    
    const { codigo } = req.body;

    const articulo = await Articulo.findOne({ codigo });

    if(!articulo){
        return res.status(200).json({
            ok: false,
            msg: 'El articulo no existe'
        })
    }else{
        return res.status(200).json({
            ok: true,
            articulo
        })
    }

  };

const crearArticulo = async (req, res = response) => {
    const { codigo, nombre, descripcion, empaque, precio, precio_oferta,  categoria, marca, inventario, imagen  } = req.body;

    const codigoExiste = await Articulo.findOne({ codigo });
    if (codigoExiste) {
        return res.status(200).json({
            ok: false,
            msg: 'Ya existe un articulo con este código'
        });
    }else{
    try {
       
        const articulo = new Articulo(req.body)

        articulo.codigo = codigo;
        articulo.nombre = nombre;
        articulo.descripcion = descripcion;
        articulo.empaque = empaque;
        articulo.precio = precio;
        articulo.precio_oferta = precio_oferta;
        articulo.categoria = categoria;
        articulo.marca = marca;
        articulo.inventario = inventario;
        articulo.imagen = imagen;

        const articulonuevo = await articulo.save();

        res.json({
            ok: true,
            articulonuevo
        })

    } catch (error) {
        console.log(error);
        res.status(200).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
    }
}

const actualizarArticulo = async (req, res = response) => {

    const { codigo, nombre, descripcion, empaque, precio, precio_oferta,  categoria, marca, inventario, imagen } = req.body;

    try {
        const articuloDB  = await Articulo.findOne({ codigo });

        if (!articuloDB) {
            return res.status(200).json({
                ok: false,
                msg: 'El articulo no existe'
            })
        }else{

            const articulo = req.body

            articulo.nombre = nombre;
            articulo.descripcion = descripcion;
            articulo.empaque = empaque;
            articulo.precio = precio;
            articulo.precio_oferta = precio_oferta;
            articulo.categoria = categoria;
            articulo.marca = marca;
            articulo.inventario = inventario;
            articulo.imagen = imagen;

            const articuloactualizar = await Articulo.findOneAndUpdate({codigo}, articulo, { new: true });

            res.json({
                ok: true,
                articuloactualizar
            })
        }
    } catch (error) {
        res.status(200).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

const borrarArticulo = async (req, res = response) => {
    const { codigo } = req.body;
    try {
        const articuloDB = await Articulo.findOne({codigo});

        if (!articuloDB) {
            return res.status(200).json({
                ok: false,
                msg: 'El articulo no existe'
            })
        }else{

        const articuloBorrar = await Articulo.findOneAndDelete({codigo});

        res.status(200).json({
            ok: true,
            msg: 'Articulo Eliminado',
            articuloBorrar
        })
    }

    } catch (error) {
        console.log(error);
        res.status(200).json({
            ok: true,
            msg: 'Error inesperado'

        })
    }

}

module.exports = {
    buscarArticulos,
    buscarArticulo,
    crearArticulo,
    actualizarArticulo,
    borrarArticulo
}