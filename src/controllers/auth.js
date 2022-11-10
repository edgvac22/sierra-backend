const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require('bcryptjs');


const loginUsuario = async(req, res = response) =>{
    const { email, password } = req.body;
    try {

        //Validar Email
        const usuarioDB = await Usuario.findOne({email});
        //validar password
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        const userType = usuarioDB.role;


        if ((usuarioDB)&&(validPassword)){
            return res.status(200).json({
                ok: true,
                role: userType,
                msg: 'Acceso Concedido'
            });
        }else{
            return res.status(200).json({
                ok: false,
                msg: 'Acceso Rechazado'
            });
        }

    } catch (error) {
        console.log(error);
        res.status(200).json({
            ok: false,
            msg: 'Llame al administrador'
        });
    }
}

module.exports = {
    loginUsuario
}