const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

const buscarUsuarios = async (req, res = response) => {

    const desde = Number(req.query.desde) || 0;

    const [usuarios, totalUsuario] = await Promise.all([
        Usuario.find().skip(desde).limit(5),
        Usuario.count()
    ])
    res.json({
        ok: true,
        usuarios,
        totalUsuario
    });
}

const buscarUsuario = async (req, res = response) => {
    
    const { email } = req.body;

    const usuario = await Usuario.findOne({ email });

    if(!usuario){
        return res.status(200).json({
            ok: false,
            msg: 'El usuario no existe'
        })
    }else{
        return res.status(200).json({
            ok: true,
            usuario
        })
    }

  };

const crearUsuario = async (req, res = response) => {
    const { password, email, nombre, direccion, telefono, role  } = req.body;

    const emailExiste = await Usuario.findOne({ email });
    if (emailExiste) {
        return res.status(200).json({
            ok: false,
            msg: 'El correo ya existe'
        });
    }else{
    try {
        const usuario = new Usuario(req.body)

        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        usuario.nombre = nombre;
        usuario.direccion = direccion;
        usuario.telefono = telefono;
        usuario.role = role;

        //Guardar usuario
        const usuarionuevo = await usuario.save();

        res.json({
            ok: true,
            usuarionuevo
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

const actualizarUsuario = async (req, res = response) => {

    const { password, email, nombre, direccion, telefono, role  } = req.body;
    
    try {
   
        const usuarioDB = await Usuario.findOne({email});

        if(!usuarioDB){
            return res.status(200).json({
                ok: false,
                msg: 'El usuario no existe'
            })
        }else{
        
        const usuario = req.body;

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        usuario.nombre = nombre;
        usuario.direccion = direccion;
        usuario.telefono = telefono;
        usuario.role = role;

        const usuarioActualizado = await Usuario.findOneAndUpdate({email}, usuario, { new: true });

        res.json({
            ok: true,
            usuarioActualizado
        })
      }
    } catch (error) {
        console.log(error);
        res.status(200).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
   
}

const borrarUsuario = async (req, res = response) => {
    const { email  } = req.body;
    try {
        const usuarioDB = await Usuario.findOne({email});

        if (!usuarioDB) {
            return res.status(200).json({
                ok: false,
                msg: 'El usuario no existe'
            })
        }else{

            const usuarioBorrado = await Usuario.findOneAndDelete({email});

            res.status(200).json({
                ok: true,
                msg: 'Usuario Eliminado',
                usuarioBorrado
            })
        }

    } catch (error) {
        console.log(error);
        res.status(200).json({
            ok: false,
            msg: 'Error inesperado'

        })
    }

}

module.exports = {
    buscarUsuarios,
    buscarUsuario,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}